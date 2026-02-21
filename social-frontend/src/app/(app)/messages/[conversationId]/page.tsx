// app/(app)/messages/[conversationId]/page.tsx
"use client";
import { useEffect, useState, useRef, useCallback, FormEvent, ChangeEvent } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import { Message, PageResponse, Conversation } from "@/lib/types";
import { auth } from "@/lib/auth";
import ChatSocket from "@/components/ChatSocket";
import EmojiGifPicker from "@/components/EmojiGifPicker";
import { getMediaUrl, getMessageMediaUrl } from "@/lib/config";

export default function ChatPage() {
    const { conversationId } = useParams<{ conversationId: string }>();
    const [messages, setMessages] = useState<Message[]>([]);
    const [conversation, setConversation] = useState<Conversation | null>(null);
    const [newMessage, setNewMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [contextMenu, setContextMenu] = useState<{ x: number, y: number, messageId: string } | null>(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const messageInputRef = useRef<HTMLInputElement>(null);
    const currentUser = auth.getUser();

    useEffect(() => {
        if (conversationId) {
            loadConversation();
            loadMessages();
            markAsRead();
        }
    }, [conversationId]);

    useEffect(() => {
        const token = auth.getToken();
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                console.log("🔐 Token Payload:", payload);
                console.log("👤 Current User ID (from Auth):", currentUser?.id);
                console.log("🆔 Token Subject (sub):", payload.sub);
                console.log("🆔 Token userId claim:", payload.userId);
            } catch (e) {
                console.error("Failed to decode token", e);
            }
        }
        scrollToBottom();
    }, [messages]);

    const loadConversation = async () => {
        try {
            const response = await api.get<Conversation>(`/api/conversations/id/${conversationId}`);
            setConversation(response.data);
        } catch (error) {
            console.error("Failed to load conversation details:", error);
        }
    };

    const loadMessages = async () => {
        try {
            const response = await api.get<PageResponse<Message>>(
                `/api/messages/conversation/${conversationId}`,
                { params: { page: 0, size: 100 } }
            );
            setMessages(response.data.content.reverse()); // Oldest first
        } catch (error) {
            console.error("Failed to load messages:", error);
        } finally {
            setLoading(false);
        }
    };

    const markAsRead = async () => {
        try {
            await api.put(`/api/conversations/${conversationId}/read`);
        } catch (error) {
            console.error("Failed to mark as read:", error);
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleSendMessage = async (e: FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() && !imageFile) return;
        if (!conversation) return;

        try {
            if (imageFile) {
                // Send with media
                const formData = new FormData();
                formData.append("file", imageFile);
                formData.append("conversationId", conversationId as string);
                formData.append("receiverId", conversation.otherUserId);
                formData.append("content", newMessage);
                formData.append("type", imageFile.type.startsWith("video") ? "VIDEO" : "IMAGE");

                await api.post("/api/messages/send-with-media", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });

                setImageFile(null);
            } else {
                // Send text message
                await api.post("/api/messages/send", {
                    conversationId: conversationId,
                    receiverId: conversation.otherUserId,
                    content: newMessage,
                    type: "TEXT",
                });
            }

            setNewMessage("");
            loadMessages(); // Reload to show new message
        } catch (error) {
            console.error("Failed to send message:", error);
        }
    };

    const handleEmojiSelect = (emoji: string) => {
        const input = messageInputRef.current;
        if (input) {
            const start = input.selectionStart || 0;
            const end = input.selectionEnd || 0;
            const before = newMessage.slice(0, start);
            const after = newMessage.slice(end);
            setNewMessage(before + emoji + after);
            // Restore cursor position after emoji
            setTimeout(() => {
                input.focus();
                const newPos = start + emoji.length;
                input.setSelectionRange(newPos, newPos);
            }, 10);
        } else {
            setNewMessage(prev => prev + emoji);
        }
    };

    const handleGifSelect = async (gifUrl: string) => {
        if (!conversation) return;
        try {
            // Send the GIF URL as a text message with a special marker
            await api.post("/api/messages/send", {
                conversationId: conversationId,
                receiverId: conversation.otherUserId,
                content: gifUrl,
                type: "GIF",
            });
            loadMessages();
        } catch (error) {
            console.error("Failed to send GIF:", error);
        }
    };

    const handleDeleteMessage = async (messageId: string) => {
        if (!confirm("Are you sure you want to delete this message for everyone?")) return;
        try {
            await api.delete(`/api/messages/${messageId}`);
            // Optimistically update local state if needed, though WS will handle it
            setMessages((prev) =>
                prev.map((msg) =>
                    msg.id === messageId ? { ...msg, deleted: true, content: "This message was deleted", mediaUrl: undefined } : msg
                )
            );
        } catch (error) {
            console.error("Failed to delete message:", error);
        }
    };

    const handleWebSocketMessage = useCallback((wsMessage: any) => {
        console.log("🔔 handleWebSocketMessage called:", wsMessage);
        console.log("Current conversationId:", conversationId);
        console.log("Message conversationId:", wsMessage.message?.conversationId);

        if (wsMessage.type === "MESSAGE" && wsMessage.message && wsMessage.message.conversationId === conversationId) {
            console.log("✅ Adding message to state:", wsMessage.message);
            setMessages((prev) => {
                // Prevent duplicates
                if (prev.some(m => m.id === wsMessage.message.id)) {
                    console.log("⚠️ Duplicate message detected, skipping");
                    return prev;
                }
                console.log("➕ Adding new message to list");
                return [...prev, wsMessage.message];
            });
            // Mark as read since we're on this conversation
            markAsRead();
        } else if (wsMessage.type === "DELETE" && wsMessage.messageId) {
            setMessages((prev) =>
                prev.map((msg) =>
                    msg.id === wsMessage.messageId ? { ...msg, deleted: true, content: "This message was deleted", mediaUrl: undefined } : msg
                )
            );
        } else {
            console.log("❌ Message not added - type or conversationId mismatch");
        }
    }, [conversationId]);

    const handleImageSelect = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
        }
    };

    const onContextMenu = (e: React.MouseEvent, messageId: string) => {
        e.preventDefault();
        setContextMenu({
            x: e.clientX,
            y: e.clientY,
            messageId
        });
    };

    useEffect(() => {
        const handleClick = () => setContextMenu(null);
        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <div className="w-12 h-12 border-4 border-primary-100 border-t-primary-600 rounded-full animate-spin" />
                <p className="text-surface-500 font-bold uppercase tracking-widest text-xs">Loading conversation...</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto h-[calc(100dvh-150px)] md:h-[calc(100vh-140px)] flex flex-col bg-surface-100 md:rounded-3xl shadow-xl border-y md:border border-surface-200 overflow-hidden animate-in -mx-4 md:mx-auto">
            {/* WebSocket Connection */}
            <ChatSocket onMessage={handleWebSocketMessage} />

            {/* Chat Header */}
            <div className="px-6 py-4 border-b border-surface-200 bg-surface-100/80 backdrop-blur-md flex items-center justify-between z-10">
                <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-surface-200 flex items-center justify-center text-primary-500 font-bold overflow-hidden border-2 border-surface-300 shadow-sm relative">
                        {conversation?.otherUserProfilePicture ? (
                            <img
                                src={getMediaUrl(conversation.otherUserProfilePicture)}
                                alt={conversation.otherUserName}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            conversation?.otherUserName?.charAt(0).toUpperCase() || "C"
                        )}
                        <div className="absolute inset-0 rounded-full ring-2 ring-inset ring-black/10"></div>
                    </div>
                    <div>
                        <h2 className="font-bold text-surface-900 leading-tight">
                            {conversation?.otherUserName || "Conversation"}
                        </h2>
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    {/* Header actions removed as requested */}
                </div>
            </div>

            {/* Messages Container */}
            <div className="flex-grow overflow-y-auto bg-surface-50 p-6 space-y-6 scrollbar-thin scrollbar-thumb-surface-300 scrollbar-track-transparent">
                {messages.length > 0 ? (
                    messages.map((message) => {
                        // Define IDs for safe access in render
                        const currentUserId = currentUser?.id?.trim();
                        const msgSenderId = message.senderId?.trim();

                        // Robust alignment logic
                        let isOwn = true;
                        if (conversation?.otherUserId) {
                            if (message.senderId === conversation.otherUserId) {
                                isOwn = false;
                            }
                        } else {
                            // Fallback to auth check
                            isOwn = currentUserId === msgSenderId;
                        }

                        return (
                            <div
                                key={message.id}
                                className={`flex w-full ${isOwn ? "justify-end" : "justify-start"} group animate-in slide-in-from-bottom-2 duration-300 relative`}
                                onContextMenu={(e) => isOwn && !message.deleted && onContextMenu(e, message.id)}
                            >
                                <div className={`flex flex-col ${isOwn ? "items-end" : "items-start"} max-w-[75%]`}>
                                    <div
                                        className={`px-5 py-3 shadow-md relative transition-all ${isOwn
                                            ? "bg-primary-600 text-white rounded-2xl rounded-tr-none shadow-primary-500/20"
                                            : "bg-surface-200 text-surface-900 rounded-2xl rounded-tl-none border border-surface-300"
                                            } ${message.deleted ? "!bg-surface-100 !text-surface-400 italic shadow-none border-dashed !border-surface-200" : ""}`}
                                    >
                                        {!message.deleted && message.type === "GIF" && message.content && (
                                            <div className="mb-1 rounded-lg overflow-hidden">
                                                <img
                                                    src={message.content}
                                                    alt="GIF"
                                                    className="max-w-[200px] h-auto rounded-lg hover:brightness-95 transition-all"
                                                    loading="lazy"
                                                />
                                            </div>
                                        )}
                                        {!message.deleted && message.mediaUrl && (
                                            <div className="mb-2 rounded-lg overflow-hidden border border-black/10">
                                                {message.type === "VIDEO" ? (
                                                    <video
                                                        src={getMessageMediaUrl(message.mediaUrl)}
                                                        controls
                                                        className="max-w-[240px] h-auto rounded-lg"
                                                    />
                                                ) : (
                                                    <img
                                                        src={getMessageMediaUrl(message.mediaUrl)}
                                                        alt="Attachment"
                                                        className="max-w-[240px] h-auto hover:grayscale-[0.3] transition-all cursor-pointer"
                                                    />
                                                )}
                                            </div>
                                        )}
                                        {message.type !== "GIF" && (
                                            <p className={`leading-relaxed whitespace-pre-wrap break-words ${!message.deleted && message.content && /^[\p{Emoji}\u200d\uFE0F\s]+$/u.test(message.content) && message.content.trim().length <= 8
                                                ? "text-3xl"
                                                : "text-[15px]"
                                                }`}>
                                                {message.deleted ? (
                                                    <span className="flex items-center space-x-2">
                                                        <span className="text-lg">🗑️</span>
                                                        <span>{message.content}</span>
                                                    </span>
                                                ) : (
                                                    message.content
                                                )}
                                            </p>
                                        )}
                                    </div>

                                    <div className={`flex items-center space-x-1 mt-1.5 px-1 ${isOwn ? "justify-end" : "justify-start"}`}>
                                        <span className="text-[10px] font-bold text-surface-500">
                                            {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                        {isOwn && !message.deleted && (
                                            <span className="text-[10px] text-primary-400 font-bold ml-1">✓✓</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-surface-400/50">
                        <span className="text-6xl mb-4 grayscale opacity-40">👋</span>
                        <p className="font-bold uppercase tracking-widest text-xs text-surface-500">No messages yet</p>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Message Input area */}
            <div className="p-4 bg-surface-100 border-t border-surface-200">
                <form onSubmit={handleSendMessage} className="relative flex items-center">
                    {imageFile && (
                        <div className="absolute bottom-full left-0 mb-4 bg-surface-100 p-3 rounded-2xl shadow-xl border border-surface-200 animate-in slide-in-from-bottom-5 flex items-center space-x-3">
                            <div className="w-12 h-12 bg-surface-200 rounded-lg flex items-center justify-center text-xl overflow-hidden">
                                <img src={URL.createObjectURL(imageFile)} className="w-full h-full object-cover opacity-80" alt="preview" />
                            </div>
                            <div className="flex-grow min-w-[100px]">
                                <p className="text-xs font-bold text-white truncate max-w-[150px]">{imageFile.name}</p>
                                <p className="text-[10px] text-primary-400 font-bold uppercase tracking-widest">Ready to send</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setImageFile(null)}
                                className="bg-surface-200 text-surface-400 hover:text-red-400 p-1.5 rounded-full transition-colors"
                            >
                                ✕
                            </button>
                        </div>
                    )}

                    <div className="flex-grow relative group flex items-center space-x-3">
                        <label className="p-3 text-surface-400 hover:text-primary-500 hover:bg-surface-200 rounded-xl cursor-pointer transition-all">
                            <input
                                type="file"
                                accept="image/*,video/*"
                                onChange={handleImageSelect}
                                className="hidden"
                            />
                            <span className="text-xl">📎</span>
                        </label>

                        <div className="flex-grow relative">
                            <input
                                ref={messageInputRef}
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Type a message..."
                                className="w-full bg-surface-50 border border-surface-200 focus:border-primary-500/50 focus:ring-4 focus:ring-primary-500/10 rounded-2xl px-5 py-3.5 text-[15px] text-white placeholder-surface-500 transition-all pr-12"
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 z-20">
                                <button
                                    type="button"
                                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                    className={`text-xl transition-all hover:scale-110 ${showEmojiPicker ? "opacity-100 scale-110 grayscale-0" : "opacity-40 hover:opacity-100 grayscale"
                                        }`}
                                >
                                    😊
                                </button>
                                <div className="absolute bottom-full right-0 mb-2 w-72">
                                    <EmojiGifPicker
                                        isOpen={showEmojiPicker}
                                        onClose={() => setShowEmojiPicker(false)}
                                        onEmojiSelect={handleEmojiSelect}
                                        onGifSelect={handleGifSelect}
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={!newMessage.trim() && !imageFile}
                            className="bg-primary-600 text-white w-12 h-12 rounded-xl hover:bg-primary-500 disabled:bg-surface-200 disabled:text-surface-400 shadow-lg shadow-primary-900/20 hover:shadow-primary-600/40 active:scale-95 transition-all flex items-center justify-center flex-shrink-0"
                        >
                            <span className="text-xl -rotate-45 translate-x-0.5 -translate-y-0.5">➤</span>
                        </button>
                    </div>
                </form>
            </div>
            {/* Context Menu */}
            {contextMenu && (
                <div
                    className="fixed z-50 bg-surface-100 shadow-2xl rounded-xl border border-surface-200 py-1.5 min-w-[160px] animate-in zoom-in-95 duration-200 backdrop-blur-md"
                    style={{ top: contextMenu.y, left: contextMenu.x }}
                >
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteMessage(contextMenu.messageId);
                            setContextMenu(null);
                        }}
                        className="w-full px-4 py-2.5 text-left text-sm font-bold text-red-400 hover:bg-surface-200 flex items-center space-x-3 transition-colors group"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        <span>Delete Message</span>
                    </button>
                    <button
                        className="w-full px-4 py-2.5 text-left text-sm font-bold text-surface-400 hover:text-white hover:bg-surface-200 flex items-center space-x-3 transition-colors group"
                        onClick={(e) => {
                            e.stopPropagation();
                            setContextMenu(null);
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                        </svg>
                        <span>Copy Text</span>
                    </button>
                </div>
            )}
        </div>
    );
}
