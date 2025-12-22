// components/PostCard.tsx
"use client";
import { useState } from "react";
import { auth } from "@/lib/auth";
import { Post } from "@/lib/types";
import api from "@/lib/api";

interface Props {
    post: Post;
    onUpdate: (updatedPost: Post) => void;
}

export default function PostCard({ post, onUpdate }: Props) {
    const [comment, setComment] = useState("");
    const [showComments, setShowComments] = useState(false);
    const currentUser = auth.getUser();

    // ✅ ADD THIS: Build full URL for media
    const getMediaUrl = (path: string) => {
        if (!path) return "";
        if (path.startsWith("http")) return path;
        return `http://localhost:8082${path}`; // Post Service URL
    };

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
        <div className="card mb-6 animate-in bg-white border-surface-200">
            {/* Header */}
            <div className="p-4 flex items-center justify-between">
                <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold overflow-hidden mr-3">
                        {post.userProfilePicture ? (
                            <img
                                src={getMediaUrl(post.userProfilePicture)}
                                alt={post.username}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            post.username.charAt(0).toUpperCase()
                        )}
                    </div>
                    <div>
                        <p className="font-bold text-surface-900 leading-tight hover:underline cursor-pointer">
                            {post.username}
                        </p>
                        <p className="text-[11px] font-medium text-surface-400 uppercase tracking-wider">
                            {new Date(post.createdAt).toLocaleDateString()} • {new Date(post.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                    </div>
                </div>
                <button className="text-surface-400 hover:text-surface-600 p-1 rounded-full hover:bg-surface-50 transition-colors">
                    <span className="text-lg">•••</span>
                </button>
            </div>

            {/* Content */}
            <div className="px-4 pb-3">
                <p className="text-surface-800 leading-relaxed whitespace-pre-wrap">{post.content}</p>
            </div>

            {/* ✅ FIX: Images - use post.images and getMediaUrl */}
            {images.length > 0 && (
                <div className={`grid gap-1 mb-2 px-1 ${images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                    {images.map((url, idx) => (
                        <img
                            key={idx}
                            src={getMediaUrl(url)}
                            alt="Post content"
                            className={`w-full object-cover ${images.length === 1 ? 'max-h-[500px] rounded-lg' : 'h-48 rounded-md hover:opacity-95 transition-opacity'}`}
                            onError={(e) => {
                                console.error("Image failed to load:", url);
                                e.currentTarget.style.display = 'none';
                            }}
                        />
                    ))}
                </div>
            )}

            {/* ✅ FIX: Video - use getMediaUrl */}
            {video && (
                <div className="px-1 mb-2">
                    <video controls className="w-full rounded-lg max-h-[500px] bg-black">
                        <source src={getMediaUrl(video)} />
                    </video>
                </div>
            )}

            {/* Actions */}
            <div className="px-4 py-3 flex items-center justify-between border-t border-surface-50">
                <div className="flex items-center space-x-1">
                    <button
                        onClick={toggleLike}
                        className={`flex items-center space-x-2 px-3 py-1.5 rounded-full transition-all ${post.isLiked
                            ? "bg-red-50 text-red-600 font-bold"
                            : "text-surface-600 hover:bg-red-50 hover:text-red-500"
                            }`}
                    >
                        <span className="text-lg">{post.isLiked ? "❤️" : "🤍"}</span>
                        <span className="text-sm">{post.likesCount}</span>
                    </button>

                    <button
                        onClick={() => setShowComments(!showComments)}
                        className={`flex items-center space-x-2 px-3 py-1.5 rounded-full transition-all ${showComments
                            ? "bg-primary-50 text-primary-600 font-bold"
                            : "text-surface-600 hover:bg-primary-50 hover:text-primary-600"
                            }`}
                    >
                        <span className="text-lg">💬</span>
                        <span className="text-sm">{post.commentsCount}</span>
                    </button>

                    <button className="flex items-center space-x-2 text-surface-600 hover:bg-green-50 hover:text-green-600 px-3 py-1.5 rounded-full transition-all">
                        <span className="text-lg">🔁</span>
                        <span className="text-sm">{post.sharesCount}</span>
                    </button>
                </div>

                <button className="text-surface-400 hover:text-primary-600 p-2 rounded-full hover:bg-primary-50 transition-all">
                    <span>🔖</span>
                </button>
            </div>

            {/* Comments Section */}
            {showComments && (
                <div className="px-4 pb-4 border-t border-surface-50 bg-surface-50/30">
                    <div className="pt-4 space-y-3">
                        {post.recentComments?.map((c) => (
                            <div key={c.id} className="flex space-x-3 group">
                                <div className="w-8 h-8 rounded-full bg-surface-200 flex-shrink-0 flex items-center justify-center text-[10px] font-bold">
                                    {c.username.charAt(0).toUpperCase()}
                                </div>
                                <div className="bg-white px-3 py-2 rounded-2xl rounded-tl-none border border-surface-100 shadow-sm flex-grow">
                                    <p className="text-xs font-bold text-surface-900 mb-0.5">{c.username}</p>
                                    <p className="text-[13px] text-surface-700">{c.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex mt-4 items-center space-x-2 bg-white p-1 pl-3 rounded-full border border-surface-200 focus-within:ring-2 focus-within:ring-primary-100 transition-all">
                        <input
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Write a comment..."
                            className="flex-grow bg-transparent border-none focus:ring-0 text-sm py-1.5"
                        />
                        <button
                            onClick={addComment}
                            disabled={!comment.trim()}
                            className="bg-primary-600 text-white p-2 rounded-full hover:bg-primary-700 disabled:bg-surface-200 transition-colors"
                        >
                            <span className="block scale-75">➤</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}