// app/(app)/messages/[conversationId]/page.tsx
"use client";
import { useEffect, useState, useRef, FormEvent, ChangeEvent } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import { Message, PageResponse, Conversation } from "@/lib/types";
import { auth } from "@/lib/auth";
import ChatSocket from "@/components/ChatSocket";

export default function ChatPage() {
    const { conversationId } = useParams<{ conversationId: string }>();
    const [messages, setMessages] = useState<Message[]>([]);
    const [conversation, setConversation] = useState<Conversation | null>(null);
    const [newMessage, setNewMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [contextMenu, setContextMenu] = useState<{ x: number, y: number, messageId: string } | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const currentUser = auth.getUser();

    useEffect(() => {
        if (conversationId) {
            loadConversation();
            loadMessages();
            markAsRead();
        }
    }, [conversationId]);

    useEffect(() => {
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
                formData.append("type", "IMAGE");

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

    const handleWebSocketMessage = (wsMessage: any) => {
        if (wsMessage.type === "MESSAGE" && wsMessage.message && wsMessage.message.conversationId === conversationId) {
            setMessages((prev) => {
                // Prevent duplicates
                if (prev.some(m => m.id === wsMessage.message.id)) return prev;
                return [...prev, wsMessage.message];
            });
        } else if (wsMessage.type === "DELETE" && wsMessage.messageId) {
            setMessages((prev) =>
                prev.map((msg) =>
                    msg.id === wsMessage.messageId ? { ...msg, deleted: true, content: "This message was deleted", mediaUrl: undefined } : msg
                )
            );
        }
    };

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
        <div className="max-w-4xl mx-auto h-[calc(100vh-140px)] flex flex-col bg-white rounded-3xl shadow-xl border border-surface-200 overflow-hidden animate-in">
            {/* WebSocket Connection */}
            <ChatSocket onMessage={handleWebSocketMessage} />

            {/* Chat Header */}
            <div className="px-6 py-4 border-b border-surface-100 bg-white/80 backdrop-blur-md flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold overflow-hidden border-2 border-white shadow-sm">
                        {conversation?.otherUserProfilePicture ? (
                            <img
                                src={conversation.otherUserProfilePicture.startsWith('http') ? conversation.otherUserProfilePicture : `http://localhost:8082${conversation.otherUserProfilePicture}`}
                                alt={conversation.otherUserName}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            conversation?.otherUserName?.charAt(0).toUpperCase() || "C"
                        )}
                    </div>
                    <div>
                        <h2 className="font-bold text-surface-900 leading-tight">
                            {conversation?.otherUserName || "Conversation"}
                        </h2>
                        <div className="flex items-center space-x-1.5">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-[10px] font-bold text-surface-400 uppercase tracking-widest">Active Now</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <button className="p-2 text-surface-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all">
                        <span className="text-xl">📞</span>
                    </button>
                    <button className="p-2 text-surface-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all">
                        <span className="text-xl">📹</span>
                    </button>
                    <button className="p-2 text-surface-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all ml-2">
                        <span className="text-xl">ℹ️</span>
                    </button>
                </div>
            </div>

            {/* Messages Container */}
            <div className="flex-grow overflow-y-auto bg-surface-50/30 p-6 space-y-4">
                {messages.length > 0 ? (
                    messages.map((message) => {
                        const isOwn = message.senderId === currentUser?.id;

                        return (
                            <div
                                key={message.id}
                                className={`flex ${isOwn ? "justify-end" : "justify-start"} group animate-in relative mb-4`}
                                onContextMenu={(e) => isOwn && !message.deleted && onContextMenu(e, message.id)}
                            >
                                <div
                                    className={`max-w-[75%] px-4 py-2.5 shadow-sm transition-all ${isOwn
                                        ? "bg-primary-600 text-white rounded-2xl rounded-tr-none"
                                        : "bg-white text-surface-800 rounded-2xl rounded-tl-none border border-surface-100"
                                        } ${message.deleted ? "!bg-surface-100 !text-surface-400 italic shadow-none border-dashed" : ""}`}
                                >
                                    {!message.deleted && message.mediaUrl && (
                                        <div className="mb-2 rounded-lg overflow-hidden border border-black/5">
                                            <img
                                                src={message.mediaUrl.startsWith('http') ? message.mediaUrl : `http://localhost:8082${message.mediaUrl}`}
                                                alt="Attachment"
                                                className="max-w-full h-auto hover:scale-105 transition-transform cursor-pointer"
                                            />
                                        </div>
                                    )}
                                    <p className="text-[15px] leading-relaxed select-text">
                                        {message.deleted ? (
                                            <span className="flex items-center space-x-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span>{message.content}</span>
                                            </span>
                                        ) : (
                                            message.content
                                        )}
                                    </p>
                                    <div
                                        className={`text-[10px] mt-1 font-bold flex items-center ${isOwn ? "text-primary-100 justify-end" : "text-surface-400"
                                            }`}
                                    >
                                        {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        {isOwn && !message.deleted && <span className="ml-1 opacity-70">✓✓</span>}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="h-full flex flex-col items-center justify-center opacity-40">
                        <span className="text-6xl mb-4">👋</span>
                        <p className="font-bold uppercase tracking-widest text-xs">Say hello!</p>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Message Input area */}
            <div className="p-4 bg-white border-t border-surface-100">
                <form onSubmit={handleSendMessage} className="relative flex items-center">
                    {imageFile && (
                        <div className="absolute bottom-full left-0 mb-4 bg-white p-2 rounded-2xl shadow-xl border border-surface-200 animate-in flex items-center space-x-3">
                            <div className="w-12 h-12 bg-surface-100 rounded-lg flex items-center justify-center text-xl">🖼️</div>
                            <div className="flex-grow min-w-[100px]">
                                <p className="text-xs font-bold text-surface-900 truncate max-w-[150px]">{imageFile.name}</p>
                                <p className="text-[10px] text-surface-400">Ready to send</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setImageFile(null)}
                                className="bg-red-50 text-red-500 p-1.5 rounded-full hover:bg-red-100 transition-colors"
                            >
                                ✕
                            </button>
                        </div>
                    )}

                    <div className="flex-grow relative group flex items-center space-x-2">
                        <label className="p-2.5 text-surface-400 hover:text-primary-600 hover:bg-primary-50 rounded-full cursor-pointer transition-all">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageSelect}
                                className="hidden"
                            />
                            <span className="text-2xl">📎</span>
                        </label>

                        <div className="flex-grow relative">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Type a message..."
                                className="w-full bg-surface-100 border-none focus:ring-2 focus:ring-primary-100 rounded-2xl px-5 py-3 text-[15px] placeholder-surface-400 transition-all pr-12"
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-xl opacity-30 hover:opacity-100 transition-opacity"
                            >
                                😊
                            </button>
                        </div>

                        <button
                            type="submit"
                            disabled={!newMessage.trim() && !imageFile}
                            className="bg-primary-600 text-white w-12 h-12 rounded-2xl hover:bg-primary-700 disabled:bg-surface-200 shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center justify-center flex-shrink-0"
                        >
                            <span className="text-xl -rotate-45 translate-x-0.5 -translate-y-0.5">➤</span>
                        </button>
                    </div>
                </form>
            </div>
            {/* Context Menu */}
            {contextMenu && (
                <div
                    className="fixed z-50 bg-white shadow-2xl rounded-2xl border border-surface-100 py-2 min-w-[160px] animate-in slide-in-from-top-1"
                    style={{ top: contextMenu.y, left: contextMenu.x }}
                >
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteMessage(contextMenu.messageId);
                            setContextMenu(null);
                        }}
                        className="w-full px-4 py-2.5 text-left text-sm font-bold text-red-500 hover:bg-red-50 flex items-center space-x-3 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        <span>Delete Message</span>
                    </button>
                    <button
                        className="w-full px-4 py-2.5 text-left text-sm font-bold text-surface-600 hover:bg-surface-50 flex items-center space-x-3 transition-colors"
                        onClick={(e) => {
                            e.stopPropagation();
                            setContextMenu(null);
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                        </svg>
                        <span>Copy Text</span>
                    </button>
                </div>
            )}
        </div>
    );
}
