// app/(app)/feed/page.tsx
"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Post, PageResponse } from "@/lib/types";
import CreatePost from "@/components/CreatePost";
import PostCard from "@/components/PostCard";

import SuggestedUsers from "@/components/SuggestedUsers";
import Link from "next/link";

export default function FeedPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const loadFeed = async (pageNum: number = 0) => {
        try {
            const response = await api.get<PageResponse<Post>>("/api/posts/feed", {
                params: { page: pageNum, size: 20 },
            });

            if (pageNum === 0) {
                setPosts(response.data.content);
            } else {
                setPosts((prev) => [...prev, ...response.data.content]);
            }

            setHasMore(response.data.number < response.data.totalPages - 1);
        } catch (error) {
            console.error("Failed to load feed:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadFeed(0);
    }, []);

    const handlePostUpdate = (updatedPost: Post) => {
        setPosts((prev) =>
            prev.map((p) => (p.id === updatedPost.id ? updatedPost : p))
        );
    };

    const loadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        loadFeed(nextPage);
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <div className="w-12 h-12 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
                <p className="text-surface-500 font-bold uppercase tracking-widest text-xs">Curating your feed...</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-8">
                <CreatePost onPostCreated={() => loadFeed(0)} />

                <div className="space-y-6">
                    {posts.length > 0 ? (
                        posts.map((post, idx) => (
                            <div key={post.id} className={`stagger-${(idx % 3) + 1}`}>
                                <PostCard post={post} onUpdate={handlePostUpdate} />
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-24 glass-card border-dashed bg-surface-100/50">
                            <div className="w-20 h-20 bg-surface-200 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-6 shadow-inner">
                                🏠
                            </div>
                            <h3 className="text-xl font-black text-white mb-2">Your feed is a bit quiet</h3>
                            <p className="text-surface-400 font-medium max-w-sm mx-auto mb-8">Follow some interesting people to see what they're sharing and start the conversation!</p>
                            <Link href="/discover" className="btn-primary inline-flex items-center space-x-2 shadow-lg shadow-primary-900/20">
                                <span>Find People</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                            </Link>
                        </div>
                    )}
                </div>

                {hasMore && (
                    <div className="text-center py-12">
                        <button
                            onClick={loadMore}
                            className="bg-surface-100 hover:bg-surface-200 text-white border border-surface-200 px-10 py-3.5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-sm hover:shadow-md active:scale-95"
                        >
                            Load More Magic
                        </button>
                    </div>
                )}
            </div>

            <div className="hidden lg:block space-y-8">
                <SuggestedUsers />

                <div className="px-6 text-[10px] text-surface-500 font-bold uppercase tracking-[0.2em] space-y-3 opacity-60 hover:opacity-100 transition-opacity">
                    <div className="flex space-x-4">
                        <span className="hover:text-primary-500 cursor-pointer transition-colors">Privacy</span>
                        <span className="hover:text-primary-500 cursor-pointer transition-colors">Terms</span>
                        <span className="hover:text-primary-500 cursor-pointer transition-colors">Safety</span>
                    </div>
                    <p className="opacity-50">© 2026 SOCIAL UNIVERSE</p>
                </div>
            </div>
        </div>
    );
}
