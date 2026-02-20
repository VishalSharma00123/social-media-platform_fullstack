// components/SuggestedUsers.tsx
"use client";
import { useState, useEffect } from "react";
import api from "@/lib/api";
import { User } from "@/lib/types";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { getMediaUrl } from "@/lib/config";

export default function SuggestedUsers() {
    const [suggestions, setSuggestions] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const currentUser = auth.getUser();

    useEffect(() => {
        loadSuggestions();
    }, []);

    const loadSuggestions = async () => {
        try {
            // First try suggestions endpoint
            const res = await api.get<User[]>("/api/users/suggestions");
            setSuggestions(res.data.slice(0, 5));
        } catch (error) {
            // Fallback: search or general user fetch
            try {
                const res = await api.get<User[]>("/api/users");
                setSuggestions(res.data.filter(u => u.username !== currentUser?.username).slice(0, 5));
            } catch (e) { }
        } finally {
            setLoading(false);
        }
    };

    const handleFollow = async (userId: string) => {
        try {
            await api.post(`/api/users/follow/${userId}`);
            // Optimistically update or reload
            loadSuggestions();
        } catch (error) {
            console.error("Failed to follow:", error);
        }
    };

    if (loading) return (
        <div className="animate-pulse space-y-4">
            <div className="h-4 bg-surface-100 rounded w-1/2"></div>
            {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-surface-100 rounded-full"></div>
                    <div className="flex-grow space-y-2">
                        <div className="h-3 bg-surface-100 rounded w-3/4"></div>
                        <div className="h-2 bg-surface-100 rounded w-1/2"></div>
                    </div>
                </div>
            ))}
        </div>
    );

    if (suggestions.length === 0) return null;

    return (
        <div className="glass-card p-6 animate-scale-in stagger-2">
            <h3 className="font-black text-surface-900 text-[11px] uppercase tracking-[0.2em] mb-6 flex items-center justify-between">
                <span className="bg-gradient-to-r from-primary-600 to-primary-900 bg-clip-text text-transparent">Suggested for you</span>
                <Link href="/discover" className="text-[10px] text-primary-500 hover:text-primary-700 transition-colors">See All</Link>
            </h3>

            <div className="space-y-6">
                {suggestions.map((user) => (
                    <div key={user.id} className="flex items-center justify-between group/user">
                        <Link href={`/profile/${user.username}`} className="flex items-center space-x-3 flex-grow min-w-0">
                            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-surface-200 to-surface-100 flex items-center justify-center text-primary-600 font-bold overflow-hidden shadow-inner group-hover/user:scale-105 transition-transform duration-300">
                                {user.profilePicture ? (
                                    <img
                                        src={getMediaUrl(user.profilePicture)}
                                        alt={user.username}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="text-sm">{user.username.charAt(0).toUpperCase()}</span>
                                )}
                            </div>
                            <div className="min-w-0">
                                <p className="text-sm font-bold text-surface-900 truncate tracking-tight group-hover/user:text-primary-600 transition-colors">
                                    {user.fullName || user.username}
                                </p>
                                <p className="text-[11px] font-bold text-surface-400 truncate mt-0.5">@{user.username}</p>
                            </div>
                        </Link>

                        <button
                            onClick={() => handleFollow(user.id)}
                            className="bg-primary-600/10 hover:bg-primary-600 text-primary-600 hover:text-white text-[11px] font-black px-4 py-2 rounded-xl transition-all active:scale-95"
                        >
                            Follow
                        </button>
                    </div>
                ))}
            </div>

            <button className="w-full mt-8 py-3 text-[11px] font-black text-surface-500 hover:text-primary-600 hover:bg-primary-50/50 rounded-2xl transition-all border border-surface-200/50 uppercase tracking-widest active:scale-[0.98]">
                Show more
            </button>
        </div>
    );
}

