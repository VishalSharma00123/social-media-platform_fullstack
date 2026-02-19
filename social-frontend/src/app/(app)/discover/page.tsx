// app/(app)/discover/page.tsx
"use client";
import { useState, useEffect } from "react";
import api from "@/lib/api";
import { User } from "@/lib/types";
import Link from "next/link";
import { auth } from "@/lib/auth";

export default function DiscoverPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<User[]>([]);
    const [suggestions, setSuggestions] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const currentUser = auth.getUser();

    useEffect(() => {
        loadSuggestions();
    }, []);

    const loadSuggestions = async () => {
        try {
            // Assuming an endpoint for suggestions or just fetch all to simulate
            const response = await api.get<User[]>("/api/users/suggestions");
            setSuggestions(response.data);
        } catch (error) {
            console.error("Failed to load suggestions:", error);
            // Fallback: just fetch some users if suggestions endpoint doesn't exist
            try {
                const res = await api.get<User[]>("/api/users");
                setSuggestions(res.data.filter(u => u.username !== currentUser?.username).slice(0, 5));
            } catch (e) { }
        }
    };

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        setLoading(true);
        try {
            const response = await api.get<User[]>(`/api/users/search`, {
                params: { query: searchQuery }
            });
            setSearchResults(response.data);
        } catch (error) {
            console.error("Search failed:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleFollow = async (userId: string) => {
        try {
            await api.post(`/api/users/follow/${userId}`);
            // Refresh counts/state
            if (searchQuery) handleSearch({ preventDefault: () => { } } as any);
            loadSuggestions();
        } catch (error) {
            console.error("Failed to follow:", error);
        }
    };

    const UserCard = ({ user }: { user: User }) => (
        <div key={user.id} className="p-4 rounded-2xl bg-surface-100 border border-surface-200 shadow-sm flex items-center justify-between hover:bg-surface-200 transition-all mb-3 animate-in fade-in slide-in-from-bottom-2">
            <Link href={`/profile/${user.username}`} className="flex items-center space-x-4 flex-grow group">
                <div className="w-12 h-12 rounded-full bg-surface-200 flex items-center justify-center text-primary-500 font-bold overflow-hidden border-2 border-surface-300 shadow-sm relative group-hover:scale-105 transition-transform">
                    {user.profilePicture ? (
                        <img src={user.profilePicture.startsWith('http') ? user.profilePicture : `http://localhost:8082${user.profilePicture}`} alt={user.username} className="w-full h-full object-cover" />
                    ) : (
                        user.username.charAt(0).toUpperCase()
                    )}
                </div>
                <div>
                    <h3 className="font-bold text-surface-900 leading-tight group-hover:text-primary-500 transition-colors">{user.fullName || user.username}</h3>
                    <p className="text-sm text-surface-500">@{user.username}</p>
                    <p className="text-xs text-surface-400 mt-0.5">{user.followersCount} followers</p>
                </div>
            </Link>

            {user.username !== currentUser?.username && (
                <button
                    onClick={() => handleFollow(user.id)}
                    className={`px-5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-lg ${user.isFollowing
                        ? "bg-surface-200 text-surface-500 hover:bg-surface-300"
                        : "bg-primary-600 text-white hover:bg-primary-500 shadow-primary-500/30"
                        }`}
                >
                    {user.isFollowing ? "Following" : "Follow"}
                </button>
            )}
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto space-y-8 h-full">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 to-primary-800 p-8 text-white shadow-2xl">
                <div className="absolute top-[-50%] right-[-10%] w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse-glow" />
                <div className="relative z-10">
                    <h1 className="text-4xl font-black tracking-tighter mb-2">Discover People</h1>
                    <p className="text-primary-100 font-medium text-lg">Find your friends and build your community</p>

                    <form onSubmit={handleSearch} className="mt-8 relative flex items-center max-w-xl">
                        <span className="absolute left-5 text-primary-300 text-xl">🔍</span>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by name or username..."
                            className="w-full pl-14 pr-32 py-4 bg-surface-900/10 backdrop-blur-sm border border-white/10 text-white placeholder-primary-200/70 rounded-2xl focus:outline-none focus:ring-4 focus:ring-white/20 shadow-inner text-base transition-all"
                        />
                        <button
                            type="submit"
                            className="absolute right-2 px-6 py-2.5 bg-white text-primary-900 rounded-xl font-bold text-sm hover:bg-surface-100 transition-colors shadow-lg"
                        >
                            Search
                        </button>
                    </form>
                </div>
            </div>

            <div className="space-y-6">
                {searchQuery && (
                    <div className="animate-in fade-in slide-in-from-bottom-4">
                        <div className="flex items-center justify-between mb-4 px-2">
                            <h2 className="text-xl font-black text-surface-900 tracking-tight flex items-center">
                                Search Results
                                {loading && <span className="ml-3 animate-spin text-primary-500 text-sm">◌</span>}
                            </h2>
                            <button onClick={() => setSearchResults([])} className="text-xs font-bold text-surface-400 hover:text-primary-500 transition-colors uppercase tracking-widest">Clear Results</button>
                        </div>
                        {searchResults.length > 0 ? (
                            <div className="grid gap-3">
                                {searchResults.map(user => <UserCard key={user.id} user={user} />)}
                            </div>
                        ) : (
                            !loading && <div className="text-center py-16 bg-surface-100 rounded-3xl border border-dashed border-surface-200">
                                <span className="text-4xl grayscale opacity-30 mb-2 block">🤷‍♂️</span>
                                <p className="text-surface-400 font-medium">No users found matching &quot;{searchQuery}&quot;</p>
                            </div>
                        )}
                    </div>
                )}

                <div className="space-y-4">
                    <h2 className="text-xl font-black text-surface-900 tracking-tight px-2">Suggested for you</h2>
                    <div className="grid gap-3">
                        {suggestions.length > 0 ? (
                            suggestions.map(user => <UserCard key={user.id + "_sugg"} user={user} />)
                        ) : (
                            <div className="text-center py-16 bg-surface-100 rounded-3xl border border-dashed border-surface-200">
                                <p className="text-surface-400 font-medium">Looking for people to suggest...</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="text-[10px] text-surface-500 px-2 space-y-2 text-center mt-12 pb-8 opacity-60 hover:opacity-100 transition-opacity">
                <p className="font-bold tracking-widest uppercase">© 2026 Social Media Inc.</p>
                <div className="flex justify-center space-x-4 font-medium">
                    <span className="hover:text-primary-500 cursor-pointer transition-colors">Privacy</span>
                    <span className="hover:text-primary-500 cursor-pointer transition-colors">Terms</span>
                    <span className="hover:text-primary-500 cursor-pointer transition-colors">Help</span>
                </div>
            </div>
        </div>
    );
}
