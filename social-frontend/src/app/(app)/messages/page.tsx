// app/(app)/messages/page.tsx
"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Conversation, User } from "@/lib/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/auth";
import ChatSocket from "@/components/ChatSocket";
import { getMediaUrl } from "@/lib/config";

export default function ConversationsPage() {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [loading, setLoading] = useState(true);
    const [showNewMessageModal, setShowNewMessageModal] = useState(false);
    const [followingUsers, setFollowingUsers] = useState<User[]>([]);
    const [followingLoading, setFollowingLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const currentUser = auth.getUser();
    const router = useRouter();

    useEffect(() => {
        loadConversations();
    }, []);

    const loadConversations = async () => {
        try {
            const response = await api.get<Conversation[]>("/api/conversations");
            setConversations(response.data);
        } catch (error) {
            console.error("Failed to load conversations:", error);
        } finally {
            setLoading(false);
        }
    };

    const loadFollowingUsers = async () => {
        if (!currentUser) return;
        setFollowingLoading(true);
        try {
            const response = await api.get<User[]>(`/api/users/${currentUser.id}/following`);
            setFollowingUsers(response.data);
        } catch (error) {
            console.error("Failed to load following users:", error);
        } finally {
            setFollowingLoading(false);
        }
    };

    const openNewMessageModal = () => {
        setShowNewMessageModal(true);
        setSearchQuery("");
        loadFollowingUsers();
    };

    const startConversation = async (userId: string) => {
        try {
            // Get or create conversation with this user
            const response = await api.get<Conversation>(`/api/conversations/${userId}`);
            const conversation = response.data;
            setShowNewMessageModal(false);
            router.push(`/messages/${conversation.id}`);
        } catch (error) {
            console.error("Failed to start conversation:", error);
        }
    };

    const filteredUsers = followingUsers.filter((user) => {
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return (
            user.username.toLowerCase().includes(q) ||
            (user.fullName && user.fullName.toLowerCase().includes(q))
        );
    });

    const handleWebSocketMessage = (wsMessage: any) => {
        if (wsMessage.type === "MESSAGE" && wsMessage.message) {
            setConversations((prev) => {
                const convId = wsMessage.message.conversationId;
                const existingIndex = prev.findIndex(c => c.id === convId);

                if (existingIndex > -1) {
                    const updated = [...prev];
                    updated[existingIndex] = {
                        ...updated[existingIndex],
                        lastMessage: wsMessage.message.content,
                        lastMessageTime: wsMessage.message.createdAt,
                        updatedAt: wsMessage.message.createdAt,
                        unreadCount: updated[existingIndex].unreadCount + (wsMessage.userId !== currentUser?.id ? 1 : 0)
                    };
                    // Move to top
                    const movedItem = updated.splice(existingIndex, 1)[0];
                    return [movedItem, ...updated];
                } else {
                    // New conversation - reload list to be safe and fetch user details
                    loadConversations();
                    return prev;
                }
            });
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <div className="w-12 h-12 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
                <p className="text-surface-500 font-bold uppercase tracking-widest text-xs">Loading conversations...</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6 animate-in pb-20 px-4 md:px-0">
            <ChatSocket onMessage={handleWebSocketMessage} />
            <div className="flex items-center justify-between sticky top-0 z-10 bg-surface-50/95 backdrop-blur-sm py-4">
                <h1 className="text-3xl font-black text-white tracking-tight">Messages</h1>
                <button
                    onClick={openNewMessageModal}
                    className="btn-primary w-auto h-auto px-4 py-2 md:px-6 md:py-2 rounded-xl text-xs md:text-sm flex items-center space-x-2 shadow-lg shadow-primary-900/20"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        <line x1="12" y1="8" x2="12" y2="14" />
                        <line x1="9" y1="11" x2="15" y2="11" />
                    </svg>
                    <span>New Message</span>
                </button>
            </div>

            <div className="grid grid-cols-1 gap-3">
                {conversations.length > 0 ? (
                    conversations.map((conv) => {
                        return (
                            <Link
                                key={conv.id}
                                href={`/messages/${conv.id}`}
                                className="p-4 rounded-2xl bg-surface-100 border border-surface-200 hover:bg-surface-200 hover:border-primary-500/30 transition-all flex items-center justify-between group active:scale-[0.98]"
                            >
                                <div className="flex items-center space-x-4 overflow-hidden">
                                    <div className="relative flex-shrink-0">
                                        <div className="w-14 h-14 rounded-full bg-surface-200 flex items-center justify-center text-primary-500 font-bold text-xl overflow-hidden border-2 border-surface-300 shadow-sm transition-transform group-hover:scale-105">
                                            {conv.otherUserProfilePicture ? (
                                                <img
                                                    src={getMediaUrl(conv.otherUserProfilePicture)}
                                                    alt={conv.otherUserName}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                conv.otherUserName?.charAt(0).toUpperCase() || "C"
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-0.5 min-w-0">
                                        <div className="flex items-center space-x-2">
                                            <h3 className="font-bold text-base text-white group-hover:text-primary-400 transition-colors truncate">
                                                {conv.otherUserName}
                                            </h3>
                                            {conv.updatedAt && !isNaN(new Date(conv.updatedAt).getTime()) && (
                                                <span className="text-[10px] font-bold text-surface-500 uppercase tracking-widest flex-shrink-0">• {new Date(conv.updatedAt).toLocaleDateString()}</span>
                                            )}
                                        </div>
                                        <p className={`text-sm line-clamp-1 max-w-xs md:max-w-md ${conv.unreadCount > 0 ? "text-white font-semibold" : "text-surface-400"}`}>
                                            {conv.lastMessage?.startsWith('http') && conv.lastMessage.includes('/files/') ? '📷 Photo' : (conv.lastMessage || "No messages yet")}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3 pl-2 flex-shrink-0">
                                    {conv.unreadCount > 0 && (
                                        <span className="bg-primary-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center shadow-lg shadow-primary-500/40 animate-pulse">
                                            {conv.unreadCount}
                                        </span>
                                    )}
                                    <span className="text-surface-400 group-hover:text-primary-500 transition-colors text-xl">›</span>
                                </div>
                            </Link>
                        );
                    })
                ) : (
                    <div className="text-center py-20 bg-surface-100/50 rounded-3xl border border-dashed border-surface-300 mx-4 md:mx-0">
                        <span className="text-6xl block mb-6 grayscale opacity-30">💬</span>
                        <p className="text-surface-400 font-bold text-lg">No conversations yet</p>
                        <p className="text-surface-500 text-sm mt-2 mb-8 px-4">Start messaging your friends to see them here!</p>
                        <button onClick={openNewMessageModal} className="btn-primary px-8 py-3 rounded-xl shadow-lg shadow-primary-900/20">Start a Conversation</button>
                    </div>
                )}
            </div>

            {/* New Message Modal */}
            {showNewMessageModal && (
                <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 p-4 md:p-0">
                    <div className="bg-surface-100 rounded-t-3xl md:rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in slide-in-from-bottom-10 md:zoom-in-95 duration-300 border border-surface-200">
                        {/* Header */}
                        <div className="flex items-center justify-between p-5 border-b border-surface-200 bg-surface-100">
                            <h2 className="text-xl font-black text-white tracking-tight">New Message</h2>
                            <button
                                onClick={() => setShowNewMessageModal(false)}
                                className="p-2 rounded-xl hover:bg-surface-200 transition-colors text-surface-400 hover:text-white"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </div>

                        {/* Search */}
                        <div className="p-4 border-b border-surface-200 bg-surface-50/50">
                            <div className="relative">
                                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search people you follow..."
                                    className="w-full bg-surface-200 border-none rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-surface-500 focus:ring-2 focus:ring-primary-500/50 focus:outline-none transition-all"
                                    autoFocus
                                />
                            </div>
                        </div>

                        {/* User List */}
                        <div className="max-h-[50vh] md:max-h-[400px] overflow-y-auto bg-surface-100 scrollbar-thin scrollbar-thumb-surface-300">
                            {followingLoading ? (
                                <div className="flex items-center justify-center py-16">
                                    <div className="flex flex-col items-center space-y-3">
                                        <div className="w-8 h-8 border-3 border-transparent border-t-primary-500 rounded-full animate-spin"></div>
                                        <span className="text-xs text-surface-500 font-medium animate-pulse">Loading contacts...</span>
                                    </div>
                                </div>
                            ) : filteredUsers.length === 0 ? (
                                <div className="py-16 text-center px-6">
                                    <span className="text-4xl block mb-3 grayscale opacity-30">🔍</span>
                                    <p className="text-white text-sm font-bold mb-1">
                                        {searchQuery ? "No matches found" : "No contacts yet"}
                                    </p>
                                    <p className="text-surface-500 text-xs mb-4">
                                        {searchQuery ? "Try a different name or check spelling." : "Start following people to message them."}
                                    </p>
                                    {!searchQuery && (
                                        <Link href="/discover" className="btn-secondary py-2 px-4 text-xs inline-block">
                                            Find People
                                        </Link>
                                    )}
                                </div>
                            ) : (
                                <div className="divide-y divide-surface-200">
                                    {filteredUsers.map((user) => (
                                        <button
                                            key={user.id}
                                            onClick={() => startConversation(user.id)}
                                            className="w-full flex items-center space-x-4 p-4 hover:bg-surface-200 transition-all group text-left"
                                        >
                                            <div className="w-12 h-12 rounded-full bg-surface-200 flex items-center justify-center text-primary-500 font-bold text-lg overflow-hidden border-2 border-surface-300 shadow-sm flex-shrink-0 transition-transform group-hover:scale-105">
                                                {user.profilePicture ? (
                                                    <img
                                                        src={getMediaUrl(user.profilePicture)}
                                                        alt={user.username}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    user.username.charAt(0).toUpperCase()
                                                )}
                                            </div>
                                            <div className="flex-grow min-w-0">
                                                <p className="font-bold text-white text-sm group-hover:text-primary-400 transition-colors truncate">
                                                    {user.fullName || user.username}
                                                </p>
                                                <p className="text-xs text-surface-500 truncate">@{user.username}</p>
                                            </div>
                                            <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0 duration-300">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-500">
                                                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                                </svg>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {!followingLoading && filteredUsers.length > 0 && (
                            <div className="px-5 py-3 border-t border-surface-200 bg-surface-50/50">
                                <p className="text-[10px] text-surface-500 text-center font-medium tracking-wide uppercase">
                                    {filteredUsers.length} {filteredUsers.length === 1 ? "person" : "people"} you follow
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
