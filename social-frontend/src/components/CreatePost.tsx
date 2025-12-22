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
        <div className="card p-5 mb-8 shadow-md border-surface-200 bg-white">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex space-x-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex-shrink-0 flex items-center justify-center text-primary-600 font-bold">
                        {/* Avatar placeholder or user inital */}
                        ?
                    </div>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="What's happening?"
                        rows={2}
                        className="w-full bg-transparent border-none focus:ring-0 text-lg placeholder-surface-400 resize-none pt-2"
                    />
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-surface-100">
                    <div className="flex items-center space-x-2">
                        <label className="flex items-center space-x-2 cursor-pointer p-2 hover:bg-primary-50 rounded-xl transition-all group">
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                            <span className="text-xl group-hover:scale-110 transition-transform">🖼️</span>
                            <span className="text-sm font-semibold text-surface-600 group-hover:text-primary-600">Photo</span>
                        </label>

                        <label className="flex items-center space-x-2 cursor-pointer p-2 hover:bg-blue-50 rounded-xl transition-all group">
                            <input
                                type="file"
                                accept="video/*"
                                onChange={handleVideoChange}
                                className="hidden"
                            />
                            <span className="text-xl group-hover:scale-110 transition-transform">🎥</span>
                            <span className="text-sm font-semibold text-surface-600 group-hover:text-blue-600">Video</span>
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !content.trim()}
                        className="btn-primary px-6 py-2 rounded-full font-bold disabled:bg-surface-200 disabled:text-surface-400"
                    >
                        {loading ? "..." : "Post"}
                    </button>
                </div>

                {(images || video) && (
                    <div className="bg-surface-50 p-3 rounded-xl flex items-center justify-between border border-surface-200 animate-in">
                        <div className="flex items-center space-x-2 text-sm text-surface-600 font-medium">
                            {images ? (
                                <><span>📸</span> <span>{images.length} images selected</span></>
                            ) : (
                                <><span>🎬</span> <span>{video?.name}</span></>
                            )}
                        </div>
                        <button
                            type="button"
                            onClick={() => { setImages(null); setVideo(null); setPostType("TEXT"); }}
                            className="text-red-500 hover:bg-red-50 p-1 rounded-lg"
                        >
                            ✕
                        </button>
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 text-red-600 text-xs p-2 rounded-lg border border-red-100">
                        {error}
                    </div>
                )}
            </form>
        </div>
    );
}

