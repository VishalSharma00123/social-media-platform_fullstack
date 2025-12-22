// app/(app)/layout.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import api from "@/lib/api";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [isReady, setIsReady] = useState(false);
    const [unreadNotifications, setUnreadNotifications] = useState(0);
    const currentUser = auth.getUser();

    // Auth guard - redirect to login if not authenticated
    useEffect(() => {
        if (!auth.isAuthenticated()) {
            router.replace("/login");
        } else {
            setIsReady(true);
            loadUnreadCount();
        }
    }, [router]);

    const loadUnreadCount = async () => {
        try {
            const res = await api.get<{ count: number }>("/api/notifications/unread-count");
            setUnreadNotifications(res.data.count);
        } catch (error) {
            console.error("Failed to load unread count:", error);
        }
    };

    const handleLogout = () => {
        auth.clearSession();
        router.push("/login");
    };

    if (!isReady) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-gray-600">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-surface-50 flex flex-col">
            {/* Navigation Header */}
            <header className="bg-white/80 backdrop-blur-md border-b border-surface-100 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-8">
                            <Link href="/feed" className="text-2xl font-black text-primary-600 tracking-tight hover:scale-105 transition-transform">
                                SOCIAL
                            </Link>

                            <nav className="hidden md:flex items-center space-x-1">
                                <Link
                                    href="/feed"
                                    className="text-surface-600 hover:text-primary-600 hover:bg-primary-50 px-4 py-2 rounded-xl transition-all font-medium"
                                >
                                    Feed
                                </Link>
                                <Link
                                    href="/notifications"
                                    className="text-surface-600 hover:text-primary-600 hover:bg-primary-50 px-4 py-2 rounded-xl transition-all font-medium relative"
                                >
                                    Notifications
                                    {unreadNotifications > 0 && (
                                        <span className="absolute top-1.5 right-1 bg-red-500 text-white text-[10px] font-bold rounded-full h-4 min-w-[16px] px-1 flex items-center justify-center border-2 border-white">
                                            {unreadNotifications}
                                        </span>
                                    )}
                                </Link>
                                <Link
                                    href="/messages"
                                    className="text-surface-600 hover:text-primary-600 hover:bg-primary-50 px-4 py-2 rounded-xl transition-all font-medium"
                                >
                                    Messages
                                </Link>
                                <Link
                                    href="/discover"
                                    className="text-surface-600 hover:text-primary-600 hover:bg-primary-50 px-4 py-2 rounded-xl transition-all font-medium"
                                >
                                    Discover
                                </Link>
                            </nav>
                        </div>


                        <div className="flex items-center space-x-4">
                            <Link
                                href={`/profile/${currentUser?.username}`}
                                className="flex items-center space-x-2 text-surface-700 hover:text-primary-600 bg-surface-100/50 hover:bg-primary-50 px-3 py-1.5 rounded-full transition-all group"
                            >
                                <div className="w-7 h-7 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold text-xs">
                                    {currentUser?.username?.charAt(0).toUpperCase()}
                                </div>
                                <span className="font-semibold text-sm">@{currentUser?.username}</span>
                            </Link>
                            <div className="h-6 w-px bg-surface-200" />
                            <button
                                onClick={handleLogout}
                                className="text-surface-400 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 transition-all"
                                title="Logout"
                            >
                                <span className="text-xl">⏻</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
                <div className="animate-in">
                    {children}
                </div>
            </main>
        </div>
    );
}

