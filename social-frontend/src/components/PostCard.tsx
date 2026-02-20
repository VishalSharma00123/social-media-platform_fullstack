// components/PostCard.tsx
"use client";
import { useState } from "react";
import { auth } from "@/lib/auth";
import { Post } from "@/lib/types";
import api from "@/lib/api";
import { getMediaUrl } from "@/lib/config";

interface Props {
    post: Post;
    onUpdate: (updatedPost: Post) => void;
}

export default function PostCard({ post, onUpdate }: Props) {
    const [comment, setComment] = useState("");
    const [showComments, setShowComments] = useState(false);
    const currentUser = auth.getUser();



    const toggleLike = async () => {
        // Optimistic Update
        const originalPost = { ...post };
        const isLiked = !post.isLiked;
        const likesCount = isLiked ? post.likesCount + 1 : Math.max(0, post.likesCount - 1);

        onUpdate({
            ...post,
            isLiked,
            likesCount
        });

        try {
            const endpoint = `/api/posts/${post.id}/like`;
            const response = post.isLiked
                ? await api.delete<Post>(endpoint)
                : await api.post<Post>(endpoint);

            // Update with actual data from server
            onUpdate(response.data);
        } catch (error) {
            console.error("Failed to toggle like:", error);
            // Revert on error
            onUpdate(originalPost);
        }
    };

    const addComment = async () => {
        if (!comment.trim() || !currentUser) return;

        const originalPost = { ...post };
        const newCommentText = comment;
        setComment(""); // Clear immediately

        // Optimistic Update
        const tempComment = {
            id: `temp-${Date.now()}`,
            userId: currentUser.id!,
            username: currentUser.username!,
            content: newCommentText,
            createdAt: new Date().toISOString()
        };

        const updatedPost = {
            ...post,
            commentsCount: post.commentsCount + 1,
            recentComments: [...(post.recentComments || []), tempComment]
        };

        onUpdate(updatedPost);

        try {
            const response = await api.post<Post>(`/api/posts/${post.id}/comments`, {
                content: newCommentText,
            });
            // Update with actual data from server
            onUpdate(response.data);
        } catch (error) {
            console.error("Failed to add comment:", error);
            // Revert on error
            onUpdate(originalPost);
            setComment(newCommentText); // Put text back so user doesn't lose it
        }
    };

    // ✅ FIX: Use post.images instead of post.imageUrls
    const images = post.images || [];
    const video = post.videoUrl;

    return (
        <div className="glass-card mb-8 animate-fade-in group/card">
            {/* Header */}
            <div className="p-5 flex items-center justify-between">
                <div className="flex items-center">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary-100 to-primary-50 flex items-center justify-center text-primary-600 font-bold overflow-hidden mr-4 shadow-inner">
                        {post.userProfilePicture ? (
                            <img
                                src={getMediaUrl(post.userProfilePicture)}
                                alt={post.username}
                                className="w-full h-full object-cover transition-transform group-hover/card:scale-110 duration-500"
                            />
                        ) : (
                            <span className="text-lg">{post.username.charAt(0).toUpperCase()}</span>
                        )}
                    </div>
                    <div>
                        <p className="font-bold text-surface-900 leading-tight hover:text-primary-600 cursor-pointer transition-colors">
                            {post.username}
                        </p>
                        <p className="text-[11px] font-bold text-surface-400 uppercase tracking-widest mt-0.5">
                            {new Date(post.createdAt).toLocaleDateString()} • {new Date(post.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                    </div>
                </div>
                <button className="text-surface-300 hover:text-primary-600 p-2 rounded-xl hover:bg-primary-50 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" /></svg>
                </button>
            </div>

            {/* Content */}
            <div className="px-5 pb-4">
                <p className="text-surface-700 leading-relaxed whitespace-pre-wrap text-[15px]">{post.content}</p>
            </div>

            {/* Media */}
            {images.length > 0 && (
                <div className={`grid gap-2 mb-2 px-3 ${images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                    {images.map((url, idx) => (
                        <div key={idx} className="relative overflow-hidden rounded-2xl bg-surface-100 aspect-square max-h-[500px]">
                            <img
                                src={getMediaUrl(url)}
                                alt="Post content"
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 cursor-zoom-in"
                                onError={(e) => {
                                    console.error("Image failed to load:", url);
                                    e.currentTarget.parentElement!.style.display = 'none';
                                }}
                            />
                        </div>
                    ))}
                </div>
            )}

            {video && (
                <div className="px-3 mb-2">
                    <div className="relative rounded-2xl overflow-hidden bg-black shadow-lg">
                        <video controls className="w-full max-h-[500px]">
                            <source src={getMediaUrl(video)} />
                        </video>
                    </div>
                </div>
            )}

            {/* Actions */}
            <div className="px-5 py-4 flex items-center justify-between border-t border-surface-100/30">
                <div className="flex items-center space-x-2">
                    <button
                        onClick={toggleLike}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${post.isLiked
                            ? "bg-red-50 text-red-500 shadow-sm"
                            : "text-surface-500 hover:bg-red-50 hover:text-red-500"
                            }`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={post.isLiked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={post.isLiked ? "animate-scale-in" : ""}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
                        <span className="text-sm font-bold">{post.likesCount}</span>
                    </button>

                    <button
                        onClick={() => setShowComments(!showComments)}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${showComments
                            ? "bg-primary-50 text-primary-600 shadow-sm"
                            : "text-surface-500 hover:bg-primary-50 hover:text-primary-600"
                            }`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                        <span className="text-sm font-bold">{post.commentsCount}</span>
                    </button>

                    <button className="flex items-center space-x-2 px-4 py-2 rounded-xl text-surface-500 hover:bg-accent-pink/10 hover:text-accent-pink transition-all duration-300 group/share">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover/share:rotate-12 transition-transform"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><polyline points="16 6 12 2 8 6" /><line x1="12" y1="2" x2="12" y2="15" /></svg>
                        <span className="text-sm font-bold">{post.sharesCount}</span>
                    </button>
                </div>

                <button className="w-10 h-10 flex items-center justify-center text-surface-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg>
                </button>
            </div>

            {/* Comments Section */}
            {showComments && (
                <div className="px-5 pb-5 border-t border-surface-200/30 bg-surface-50/20 animate-fade-in">
                    <div className="pt-5 space-y-4">
                        {post.recentComments?.map((c) => (
                            <div key={c.id} className="flex space-x-3 group/comment">
                                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-surface-200 to-surface-100 flex-shrink-0 flex items-center justify-center text-[10px] font-black text-surface-600 shadow-sm">
                                    {c.username.charAt(0).toUpperCase()}
                                </div>
                                <div className="flex-grow">
                                    <div className="bg-surface-200/70 backdrop-blur-sm px-4 py-2.5 rounded-2xl rounded-tl-none border border-surface-300/50 shadow-sm">
                                        <p className="text-xs font-black text-white mb-0.5">@{c.username}</p>
                                        <p className="text-[13px] text-surface-300 leading-relaxed">{c.content}</p>
                                    </div>
                                    <div className="flex items-center mt-1 ml-1 space-x-4 opacity-0 group-hover/comment:opacity-100 transition-opacity">
                                        <button className="text-[10px] font-bold text-surface-500 hover:text-primary-500">Like</button>
                                        <button className="text-[10px] font-bold text-surface-500 hover:text-primary-500">Reply</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex mt-6 items-center space-x-3 bg-surface-50/50 backdrop-blur-sm p-1.5 pl-4 rounded-2xl border border-surface-200/60 focus-within:ring-2 focus-within:ring-primary-500/20 focus-within:border-primary-500/50 transition-all duration-300">
                        <input
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Write a charming comment..."
                            className="flex-grow bg-transparent border-none focus:ring-0 text-sm py-2 text-white placeholder-surface-500"
                        />
                        <button
                            onClick={addComment}
                            disabled={!comment.trim()}
                            className="bg-primary-600 text-white w-10 h-10 rounded-xl flex items-center justify-center hover:bg-primary-700 disabled:bg-surface-200 disabled:opacity-50 transition-all shadow-lg shadow-primary-500/20 active:scale-95"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}