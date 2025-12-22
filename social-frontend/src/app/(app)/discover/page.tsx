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
        <div className="card p-4 flex items-center justify-between hover:bg-surface-50 transition-all border-surface-100 mb-3 bg-white">
            <Link href={`/profile/${user.username}`} className="flex items-center space-x-4 flex-grow">
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold overflow-hidden border-2 border-white shadow-sm">
                    {user.profilePicture ? (
                        <img src={user.profilePicture.startsWith('http') ? user.profilePicture : `http://localhost:8082${user.profilePicture}`} alt={user.username} className="w-full h-full object-cover" />
                    ) : (
                        user.username.charAt(0).toUpperCase()
                    )}
                </div>
                <div>
                    <h3 className="font-bold text-surface-900 leading-tight">{user.fullName || user.username}</h3>
                    <p className="text-sm text-surface-500">@{user.username}</p>
                    <p className="text-xs text-surface-400 mt-0.5">{user.followersCount} followers</p>
                </div>
            </Link>

            {user.username !== currentUser?.username && (
                <button
                    onClick={() => handleFollow(user.id)}
                    className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all ${user.isFollowing
                            ? "bg-surface-100 text-surface-600 hover:bg-surface-200"
                            : "bg-primary-600 text-white hover:bg-primary-700 shadow-sm"
                        }`}
                >
                    {user.isFollowing ? "Following" : "Follow"}
                </button>
            )}
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto space-y-8 h-full">
            <div className="card p-6 bg-primary-600 text-white shadow-xl border-none relative overflow-hidden">
                <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                <div className="relative z-10">
                    <h1 className="text-3xl font-black tracking-tight mb-2">Discover People</h1>
                    <p className="text-primary-100 font-medium">Find your friends and build your community</p>

                    <form onSubmit={handleSearch} className="mt-6 relative flex items-center max-w-xl">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by name or username..."
                            className="w-full pl-12 pr-4 py-3.5 bg-white text-surface-900 rounded-2xl focus:outline-none focus:ring-4 focus:ring-white/20 shadow-lg text-sm"
                        />
                        <span className="absolute left-4 text-surface-400 text-xl">🔍</span>
                        <button
                            type="submit"
                            className="absolute right-2 px-4 py-2 bg-primary-600 text-white rounded-xl font-bold text-xs hover:bg-primary-700 transition-colors"
                        >
                            Search
                        </button>
                    </form>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    {searchQuery && (
                        <div className="animate-in">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-black text-surface-900 tracking-tight flex items-center">
                                    Search Results
                                    {loading && <span className="ml-3 animate-spin text-primary-600 text-sm">◌</span>}
                                </h2>
                                <button onClick={() => setSearchResults([])} className="text-xs font-bold text-surface-400 hover:text-primary-600">Clear</button>
                            </div>
                            {searchResults.length > 0 ? (
                                <div className="space-y-1">
                                    {searchResults.map(user => <UserCard key={user.id} user={user} />)}
                                </div>
                            ) : (
                                !loading && <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-surface-200">
                                    <p className="text-surface-400 font-medium">No users found matching "{searchQuery}"</p>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="space-y-4">
                        <h2 className="text-xl font-black text-surface-900 tracking-tight">Suggested for you</h2>
                        <div className="space-y-1">
                            {suggestions.length > 0 ? (
                                suggestions.map(user => <UserCard key={user.id} user={user} />)
                            ) : (
                                <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-surface-200">
                                    <p className="text-surface-400 font-medium">Looking for people to suggest...</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="card p-6 bg-white border-surface-200 shadow-sm">
                        <h3 className="font-black text-surface-900 text-sm uppercase tracking-widest mb-4">Trending Today</h3>
                        <div className="space-y-4">
                            {['#ReactJS', '#NextJS', '#TailwindCSS', '#FullStack'].map(tag => (
                                <div key={tag} className="group cursor-pointer">
                                    <p className="text-sm font-bold text-surface-900 group-hover:text-primary-600 transition-colors">{tag}</p>
                                    <p className="text-[10px] text-surface-400 font-bold uppercase tracking-tighter">1.2k posts</p>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-6 py-2 text-xs font-bold text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                            Show more
                        </button>
                    </div>

                    <div className="text-[10px] text-surface-400 px-2 space-y-1">
                        <p>© 2024 SOCIAL MEDIA INC.</p>
                        <div className="flex space-x-2">
                            <span className="hover:underline cursor-pointer">Privacy</span>
                            <span className="hover:underline cursor-pointer">Terms</span>
                            <span className="hover:underline cursor-pointer">Help</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
