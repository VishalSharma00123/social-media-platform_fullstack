// components/CreatePost.tsx
"use client";
import { useState, FormEvent, ChangeEvent } from "react";
import api from "@/lib/api";

interface Props {
    onPostCreated: () => void;
}

export default function CreatePost({ onPostCreated }: Props) {
    const [content, setContent] = useState("");
    const [postType, setPostType] = useState<"TEXT" | "IMAGE" | "VIDEO">("TEXT");
    const [images, setImages] = useState<FileList | null>(null);
    const [video, setVideo] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!content.trim()) {
            setError("Content cannot be empty");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const formData = new FormData();

            const requestBlob = new Blob(
                [JSON.stringify({ content, postType })],
                { type: "application/json" }
            );
            formData.append("request", requestBlob);

            if (images && postType === "IMAGE") {
                Array.from(images).forEach((file) => {
                    formData.append("images", file);
                });
            }

            if (video && postType === "VIDEO") {
                formData.append("video", video);
            }

            // ✅ Don't set Content-Type manually for FormData
            const response = await api.post("/api/posts", formData);

            console.log("Post created:", response.data);

            setContent("");
            setImages(null);
            setVideo(null);
            setPostType("TEXT");
            onPostCreated();
        } catch (err: any) {
            console.error("Error:", err.response?.data || err.message);
            setError(err.response?.data?.message || "Failed to create post");
        } finally {
            setLoading(false);
        }
    };
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        setImages(e.target.files);
        setPostType("IMAGE");
    };

    const handleVideoChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setVideo(file || null);
        setPostType("VIDEO");
    };

    return (
        <div className="glass-card p-6 mb-8 animate-scale-in">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-tr from-primary-600 to-primary-400 rounded-2xl flex-shrink-0 flex items-center justify-center text-white font-bold shadow-lg shadow-primary-500/20">
                        {/* Avatar placeholder */}
                        <span className="text-lg">S</span>
                    </div>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Share something interesting..."
                        rows={3}
                        className="w-full bg-transparent border-none focus:ring-0 text-lg placeholder-surface-400 resize-none pt-2 text-surface-900"
                    />
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-surface-100/50">
                    <div className="flex items-center space-x-3">
                        <label className="flex items-center space-x-2 cursor-pointer px-4 py-2 hover:bg-primary-50 rounded-xl transition-all group">
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-primary-500 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
                            <span className="text-sm font-bold text-surface-600 group-hover:text-primary-600">Image</span>
                        </label>

                        <label className="flex items-center space-x-2 cursor-pointer px-4 py-2 hover:bg-accent-cyan/10 rounded-xl transition-all group">
                            <input
                                type="file"
                                accept="video/*"
                                onChange={handleVideoChange}
                                className="hidden"
                            />
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-accent-cyan group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" /></svg>
                            <span className="text-sm font-bold text-surface-600 group-hover:text-accent-cyan">Video</span>
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !content.trim()}
                        className="btn-primary"
                    >
                        {loading ? (
                            <span className="flex items-center space-x-2">
                                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                <span>Posting...</span>
                            </span>
                        ) : "Post"}
                    </button>
                </div>

                {(images || video) && (
                    <div className="bg-surface-50/50 p-4 rounded-xl flex items-center justify-between border border-surface-200/50 animate-fade-in">
                        <div className="flex items-center space-x-3 text-sm text-surface-700 font-semibold">
                            {images ? (
                                <div className="flex items-center space-x-2">
                                    <span className="p-1.5 bg-primary-100 rounded-lg text-primary-600">📸</span>
                                    <span>{images.length} images selected</span>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-2">
                                    <span className="p-1.5 bg-accent-cyan/10 rounded-lg text-accent-cyan">🎬</span>
                                    <span className="truncate max-w-[200px]">{video?.name}</span>
                                </div>
                            )}
                        </div>
                        <button
                            type="button"
                            onClick={() => { setImages(null); setVideo(null); setPostType("TEXT"); }}
                            className="w-8 h-8 flex items-center justify-center text-surface-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                        </button>
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 text-red-600 text-sm font-bold px-4 py-3 rounded-xl border border-red-100 animate-fade-in flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                        <span>{error}</span>
                    </div>
                )}
            </form>
        </div>
    );
}


