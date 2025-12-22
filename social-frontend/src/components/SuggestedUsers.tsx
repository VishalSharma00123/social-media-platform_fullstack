// components/SuggestedUsers.tsx
"use client";
import { useState, useEffect } from "react";
import api from "@/lib/api";
import { User } from "@/lib/types";
import Link from "next/link";
import { auth } from "@/lib/auth";

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
        <div className="card p-5 bg-white border-surface-100 shadow-sm animate-in">
            <h3 className="font-black text-surface-900 text-xs uppercase tracking-widest mb-5 flex items-center justify-between">
                <span>Who to follow</span>
                <Link href="/discover" className="text-[10px] text-primary-600 hover:underline">Explore</Link>
            </h3>

            <div className="space-y-5">
                {suggestions.map((user) => (
                    <div key={user.id} className="flex items-center justify-between group">
                        <Link href={`/profile/${user.username}`} className="flex items-center space-x-3 flex-grow">
                            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold overflow-hidden border border-surface-100">
                                {user.profilePicture ? (
                                    <img
                                        src={user.profilePicture.startsWith('http') ? user.profilePicture : `http://localhost:8082${user.profilePicture}`}
                                        alt={user.username}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    user.username.charAt(0).toUpperCase()
                                )}
                            </div>
                            <div className="min-w-0">
                                <p className="text-sm font-bold text-surface-900 truncate tracking-tight">{user.fullName || user.username}</p>
                                <p className="text-[11px] text-surface-400 font-medium truncate">@{user.username}</p>
                            </div>
                        </Link>

                        <button
                            onClick={() => handleFollow(user.id)}
                            className="text-xs font-black text-primary-600 hover:bg-primary-50 px-3 py-1.5 rounded-full transition-all"
                        >
                            Follow
                        </button>
                    </div>
                ))}
            </div>

            <button className="w-full mt-6 py-2.5 text-xs font-bold text-surface-500 hover:bg-surface-50 rounded-xl transition-colors border border-surface-100">
                Show more
            </button>
        </div>
    );
}
