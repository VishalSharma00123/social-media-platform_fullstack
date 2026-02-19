"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

interface EmojiGifPickerProps {
    onEmojiSelect: (emoji: string) => void;
    onGifSelect: (gifUrl: string) => void;
    isOpen: boolean;
    onClose: () => void;
}

const TENOR_API_KEY = "AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ"; // Free public Tenor API key
const TENOR_CLIENT_KEY = "social_media_chat";

interface TenorGif {
    id: string;
    title: string;
    media_formats: {
        tinygif?: { url: string; dims: number[] };
        gif?: { url: string; dims: number[] };
        mediumgif?: { url: string; dims: number[] };
    };
}

export default function EmojiGifPicker({ onEmojiSelect, onGifSelect, isOpen, onClose }: EmojiGifPickerProps) {
    const [activeTab, setActiveTab] = useState<"emoji" | "gif">("emoji");
    const [gifSearch, setGifSearch] = useState("");
    const [gifs, setGifs] = useState<TenorGif[]>([]);
    const [gifLoading, setGifLoading] = useState(false);
    const [trendingGifs, setTrendingGifs] = useState<TenorGif[]>([]);
    const pickerRef = useRef<HTMLDivElement>(null);
    const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Close on outside click
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
                onClose();
            }
        }
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, onClose]);

    // Load trending GIFs
    useEffect(() => {
        if (activeTab === "gif" && trendingGifs.length === 0) {
            loadTrendingGifs();
        }
    }, [activeTab]);

    const loadTrendingGifs = async () => {
        setGifLoading(true);
        try {
            const res = await fetch(
                `https://tenor.googleapis.com/v2/featured?key=${TENOR_API_KEY}&client_key=${TENOR_CLIENT_KEY}&limit=30`
            );
            const data = await res.json();
            setTrendingGifs(data.results || []);
            setGifs(data.results || []);
        } catch (err) {
            console.error("Failed to load trending GIFs:", err);
        } finally {
            setGifLoading(false);
        }
    };

    const searchGifs = useCallback(async (query: string) => {
        if (!query.trim()) {
            setGifs(trendingGifs);
            return;
        }
        setGifLoading(true);
        try {
            const res = await fetch(
                `https://tenor.googleapis.com/v2/search?q=${encodeURIComponent(query)}&key=${TENOR_API_KEY}&client_key=${TENOR_CLIENT_KEY}&limit=30`
            );
            const data = await res.json();
            setGifs(data.results || []);
        } catch (err) {
            console.error("Failed to search GIFs:", err);
        } finally {
            setGifLoading(false);
        }
    }, [trendingGifs]);

    const handleGifSearchChange = (value: string) => {
        setGifSearch(value);
        if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
        searchTimeoutRef.current = setTimeout(() => searchGifs(value), 400);
    };

    const handleEmojiSelect = (emoji: any) => {
        onEmojiSelect(emoji.native);
    };

    const handleGifClick = (gif: TenorGif) => {
        const url = gif.media_formats.mediumgif?.url || gif.media_formats.gif?.url || gif.media_formats.tinygif?.url;
        if (url) {
            onGifSelect(url);
            onClose();
        }
    };

    const getGifPreviewUrl = (gif: TenorGif): string => {
        return gif.media_formats.tinygif?.url || gif.media_formats.gif?.url || "";
    };

    if (!isOpen) return null;

    return (
        <div
            ref={pickerRef}
            className="absolute bottom-full right-0 mb-2 z-50 animate-in slide-in-from-bottom-2 duration-200"
            style={{ width: "352px" }}
        >
            <div className="bg-white rounded-2xl shadow-2xl border border-surface-200 overflow-hidden">
                {/* Tab Bar */}
                <div className="flex border-b border-surface-100">
                    <button
                        onClick={() => setActiveTab("emoji")}
                        className={`flex-1 py-3 text-sm font-semibold transition-all ${activeTab === "emoji"
                                ? "text-primary-600 border-b-2 border-primary-600 bg-primary-50/50"
                                : "text-surface-400 hover:text-surface-600 hover:bg-surface-50"
                            }`}
                    >
                        😊 Emojis
                    </button>
                    <button
                        onClick={() => setActiveTab("gif")}
                        className={`flex-1 py-3 text-sm font-semibold transition-all ${activeTab === "gif"
                                ? "text-primary-600 border-b-2 border-primary-600 bg-primary-50/50"
                                : "text-surface-400 hover:text-surface-600 hover:bg-surface-50"
                            }`}
                    >
                        🎬 GIFs
                    </button>
                </div>

                {/* Content */}
                {activeTab === "emoji" ? (
                    <div className="emoji-picker-container">
                        <Picker
                            data={data}
                            onEmojiSelect={handleEmojiSelect}
                            theme="light"
                            set="native"
                            perLine={8}
                            emojiSize={28}
                            emojiButtonSize={36}
                            maxFrequentRows={2}
                            previewPosition="none"
                            skinTonePosition="search"
                            navPosition="top"
                            searchPosition="sticky"
                            dynamicWidth={false}
                        />
                    </div>
                ) : (
                    <div className="h-[400px] flex flex-col">
                        {/* GIF Search */}
                        <div className="p-3 border-b border-surface-100">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={gifSearch}
                                    onChange={(e) => handleGifSearchChange(e.target.value)}
                                    placeholder="Search GIFs..."
                                    className="w-full bg-surface-100 border-none rounded-xl px-4 py-2.5 text-sm placeholder-surface-400 focus:ring-2 focus:ring-primary-100 focus:outline-none transition-all"
                                    autoFocus
                                />
                                <svg
                                    className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>

                        {/* GIF Grid */}
                        <div className="flex-1 overflow-y-auto p-2">
                            {gifLoading ? (
                                <div className="flex items-center justify-center h-full">
                                    <div className="flex flex-col items-center space-y-3">
                                        <div className="w-8 h-8 border-3 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
                                        <span className="text-xs text-surface-400 font-medium">Loading GIFs...</span>
                                    </div>
                                </div>
                            ) : gifs.length === 0 ? (
                                <div className="flex items-center justify-center h-full">
                                    <div className="text-center">
                                        <p className="text-3xl mb-2">🔍</p>
                                        <p className="text-sm text-surface-400">No GIFs found</p>
                                        <p className="text-xs text-surface-300 mt-1">Try a different search</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 gap-1.5">
                                    {gifs.map((gif) => (
                                        <button
                                            key={gif.id}
                                            onClick={() => handleGifClick(gif)}
                                            className="relative rounded-lg overflow-hidden hover:ring-2 hover:ring-primary-400 transition-all group aspect-square bg-surface-100"
                                        >
                                            <img
                                                src={getGifPreviewUrl(gif)}
                                                alt={gif.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                                loading="lazy"
                                            />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Powered by Tenor */}
                        <div className="px-3 py-2 border-t border-surface-100 flex items-center justify-center">
                            <span className="text-[10px] text-surface-300 font-medium tracking-wide">Powered by Tenor</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
