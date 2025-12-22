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
                <div className="w-12 h-12 border-4 border-primary-100 border-t-primary-600 rounded-full animate-spin" />
                <p className="text-surface-500 font-bold uppercase tracking-widest text-xs">Curating your feed...</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                <CreatePost onPostCreated={() => loadFeed(0)} />

                <div className="space-y-4">
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <PostCard key={post.id} post={post} onUpdate={handlePostUpdate} />
                        ))
                    ) : (
                        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-surface-200">
                            <span className="text-4xl block mb-4">🏠</span>
                            <p className="text-surface-500 font-medium">Your feed is quiet. Try following some people!</p>
                            <Link href="/discover" className="mt-4 inline-block btn-primary px-6 py-2 rounded-full text-sm">
                                Find People
                            </Link>
                        </div>
                    )}
                </div>

                {hasMore && (
                    <div className="text-center mt-12 pb-12">
                        <button
                            onClick={loadMore}
                            className="px-8 py-3 bg-white border border-surface-200 text-surface-600 font-bold rounded-full hover:bg-primary-50 hover:text-primary-600 hover:border-primary-200 transition-all shadow-sm active:scale-95"
                        >
                            Load More Posts
                        </button>
                    </div>
                )}
            </div>

            <div className="hidden lg:block space-y-6">
                <SuggestedUsers />

                <div className="card p-6 bg-white border-surface-100 shadow-sm">
                    <h3 className="font-black text-surface-900 text-xs uppercase tracking-widest mb-4">Trending</h3>
                    <div className="space-y-4">
                        {['#WorldNews', '#Technology', '#Sport', '#Design'].map(tag => (
                            <div key={tag} className="cursor-pointer group">
                                <p className="text-sm font-bold text-surface-800 group-hover:text-primary-600 transition-colors">{tag}</p>
                                <p className="text-[10px] text-surface-400 font-bold tracking-tight">2.4k Posts</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="px-4 text-[10px] text-surface-400 font-bold uppercase tracking-wider space-y-1">
                    <p>© 2024 SOCIAL MEDIA</p>
                    <div className="flex space-x-3">
                        <span className="hover:underline cursor-pointer">Privacy</span>
                        <span className="hover:underline cursor-pointer">Terms</span>
                        <span className="hover:underline cursor-pointer">Safety</span>
                    </div>
                </div>
            </div>
        </div>
    );
}


