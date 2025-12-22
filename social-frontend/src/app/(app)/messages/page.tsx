// app/(app)/messages/page.tsx
"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Conversation } from "@/lib/types";
import Link from "next/link";
import { auth } from "@/lib/auth";
import ChatSocket from "@/components/ChatSocket";

export default function ConversationsPage() {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [loading, setLoading] = useState(true);
    const currentUser = auth.getUser();

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
                <div className="w-12 h-12 border-4 border-primary-100 border-t-primary-600 rounded-full animate-spin" />
                <p className="text-surface-500 font-bold uppercase tracking-widest text-xs">Loading conversations...</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in">
            <ChatSocket onMessage={handleWebSocketMessage} />
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-black text-surface-900 tracking-tight">Messages</h1>
                <button className="btn-primary px-6 py-2 rounded-full text-sm">New Message</button>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {conversations.length > 0 ? (
                    conversations.map((conv) => {
                        return (
                            <Link
                                key={conv.id}
                                href={`/messages/${conv.id}`}
                                className="card p-5 bg-white border-surface-100 hover:border-primary-200 hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-between group"
                            >
                                <div className="flex items-center space-x-5">
                                    <div className="relative">
                                        <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold text-xl overflow-hidden border-2 border-white shadow-sm transition-transform group-hover:scale-105">
                                            {conv.otherUserProfilePicture ? (
                                                <img
                                                    src={conv.otherUserProfilePicture.startsWith('http') ? conv.otherUserProfilePicture : `http://localhost:8082${conv.otherUserProfilePicture}`}
                                                    alt={conv.otherUserName}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                conv.otherUserName?.charAt(0).toUpperCase() || "C"
                                            )}
                                        </div>
                                        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
                                    </div>

                                    <div className="space-y-1">
                                        <div className="flex items-center space-x-2">
                                            <h3 className="font-bold text-surface-900 group-hover:text-primary-600 transition-colors">
                                                {conv.otherUserName}
                                            </h3>
                                            <span className="text-[10px] font-bold text-surface-400 uppercase tracking-widest">• {new Date(conv.updatedAt).toLocaleDateString()}</span>
                                        </div>
                                        <p className="text-sm text-surface-500 line-clamp-1 max-w-md">
                                            {conv.lastMessage || "No messages yet"}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4">
                                    {conv.unreadCount > 0 && (
                                        <span className="bg-primary-600 text-white text-[10px] font-bold px-2 py-1 rounded-full min-w-[20px] text-center shadow-md">
                                            {conv.unreadCount}
                                        </span>
                                    )}
                                    <span className="text-surface-300 group-hover:text-primary-400 transition-colors text-xl">›</span>
                                </div>
                            </Link>
                        );
                    })
                ) : (
                    <div className="text-center py-32 bg-white rounded-3xl border border-dashed border-surface-200">
                        <span className="text-6xl block mb-6">💬</span>
                        <p className="text-surface-500 font-bold text-lg">No conversations yet</p>
                        <p className="text-surface-400 text-sm mt-2 mb-8">Start messaging your friends to see them here!</p>
                        <Link href="/discover" className="btn-primary px-8 py-3 rounded-full">Find People to Chat</Link>
                    </div>
                )}
            </div>
        </div>
    );
}
