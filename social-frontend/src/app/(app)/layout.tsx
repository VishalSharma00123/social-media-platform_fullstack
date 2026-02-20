// app/(app)/layout.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import api from "@/lib/api";
import { getMediaUrl } from "@/lib/config";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isReady, setIsReady] = useState(false);
    const [unreadNotifications, setUnreadNotifications] = useState(0);
    const currentUser = auth.getUser();



    // Auth guard - redirect to login if not authenticated
    useEffect(() => {
        // Small delay to ensure cookies are fully set after login
        const timer = setTimeout(() => {
            if (!auth.isAuthenticated()) {
                router.replace("/login");
            } else {
                setIsReady(true);
                loadUnreadCount();
            }
        }, 50);

        return () => clearTimeout(timer);
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
            <div className="min-h-screen flex items-center justify-center bg-surface-50 text-white">
                <div className="w-12 h-12 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
            </div>
        );
    }

    const NavIcon = ({ href, icon, label, active }: { href: string; icon: any; label: string; active: boolean }) => (
        <Link
            href={href}
            className={`flex flex-col items-center justify-center space-y-1 w-full py-2 transition-all ${active ? "text-primary-500" : "text-surface-500 hover:text-white"}`}
        >
            <div className={`p-1.5 rounded-xl transition-all ${active ? "bg-primary-500/10" : ""}`}>
                {icon}
            </div>
            <span className="text-[10px] font-bold">{label}</span>
        </Link>
    );

    return (
        <div className="min-h-screen bg-surface-50 flex flex-col pb-20 md:pb-0">
            {/* Desktop Navigation Header */}
            <header className="glass sticky top-0 z-50 border-b border-surface-200/50 hidden md:block">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        <div className="flex items-center space-x-12">
                            <Link href="/feed" className="flex items-center space-x-3 group">
                                <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/20 group-hover:rotate-12 transition-transform duration-300">
                                    <span className="text-white font-black text-xl">S</span>
                                </div>
                                <span className="text-2xl font-black text-white tracking-tight group-hover:text-primary-500 transition-colors">
                                    SOCIAL
                                </span>
                            </Link>

                            <nav className="flex items-center space-x-2">
                                <Link
                                    href="/feed"
                                    className={`nav-link ${pathname === '/feed' ? 'nav-link-active' : ''}`}
                                >
                                    Feed
                                </Link>
                                <Link
                                    href="/notifications"
                                    className={`nav-link relative ${pathname === '/notifications' ? 'nav-link-active' : ''}`}
                                >
                                    Notifications
                                    {unreadNotifications > 0 && (
                                        <span className="absolute top-2 right-2 bg-primary-600 text-white text-[10px] font-bold rounded-full h-4 min-w-[16px] px-1 flex items-center justify-center border border-surface-100 animate-pulse">
                                            {unreadNotifications}
                                        </span>
                                    )}
                                </Link>
                                <Link
                                    href="/messages"
                                    className={`nav-link ${pathname === '/messages' ? 'nav-link-active' : ''}`}
                                >
                                    Messages
                                </Link>
                                <Link
                                    href="/discover"
                                    className={`nav-link ${pathname === '/discover' ? 'nav-link-active' : ''}`}
                                >
                                    Discover
                                </Link>
                            </nav>
                        </div>

                        <div className="flex items-center space-x-6">
                            <Link
                                href={`/profile/${currentUser?.username}`}
                                className="flex items-center space-x-3 p-1.5 pr-4 rounded-full bg-surface-100 border border-surface-200 hover:border-primary-500/50 hover:bg-surface-200 transition-all group"
                            >
                                <div className="w-9 h-9 bg-gradient-to-tr from-primary-600 to-primary-800 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-inner overflow-hidden">
                                    {currentUser?.profilePicture ? (
                                        <img src={currentUser.profilePicture} className="w-full h-full object-cover" alt="" />
                                    ) : (
                                        currentUser?.username?.charAt(0).toUpperCase()
                                    )}
                                </div>
                                <span className="font-bold text-sm text-surface-200 group-hover:text-white transition-colors">
                                    {currentUser?.username}
                                </span>
                            </Link>

                            <button
                                onClick={handleLogout}
                                className="text-surface-400 hover:text-red-500 p-2.5 rounded-xl hover:bg-surface-100 transition-all active:scale-95 group"
                                title="Logout"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Header */}
            <header className="md:hidden glass sticky top-0 z-50 border-b border-surface-200/50 px-4 py-3 flex items-center justify-between">
                <Link href="/feed" className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center shadow-lg shadow-primary-500/20">
                        <span className="text-white font-black text-lg">S</span>
                    </div>
                    <span className="text-xl font-black text-white tracking-tight">SOCIAL</span>
                </Link>
                <div className="flex items-center space-x-3">
                    <Link href={`/profile/${currentUser?.username}`}>
                        <div className="w-8 h-8 bg-gradient-to-tr from-primary-600 to-primary-800 rounded-full flex items-center justify-center text-white font-bold text-xs overflow-hidden border border-surface-200">
                            {currentUser?.profilePicture ? (
                                <img src={currentUser.profilePicture} className="w-full h-full object-cover" alt="" />
                            ) : (
                                currentUser?.username?.charAt(0).toUpperCase()
                            )}
                        </div>
                    </Link>
                    <button onClick={handleLogout} className="text-surface-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
                <div className="animate-slide-up">
                    {children}
                </div>
            </main>

            {/* Mobile Bottom Navigation */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface-100/90 backdrop-blur-xl border-t border-surface-200/50 pb-safe-area">
                <div className="flex items-center justify-around px-2 py-1">
                    <NavIcon
                        href="/feed"
                        active={pathname === '/feed'}
                        label="Home"
                        icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>}
                    />
                    <NavIcon
                        href="/discover"
                        active={pathname === '/discover'}
                        label="Discover"
                        icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>}
                    />
                    <Link
                        href="/notifications"
                        className={`flex flex-col items-center justify-center space-y-1 w-full py-2 transition-all relative ${pathname === '/notifications' ? "text-primary-500" : "text-surface-500 hover:text-white"}`}
                    >
                        <div className={`p-1.5 rounded-xl transition-all ${pathname === '/notifications' ? "bg-primary-500/10" : ""}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>
                        </div>
                        {unreadNotifications > 0 && (
                            <span className="absolute top-2 right-6 bg-primary-600 text-white text-[10px] font-bold rounded-full h-3.5 w-3.5 flex items-center justify-center border border-surface-100 animate-pulse">
                                {unreadNotifications}
                            </span>
                        )}
                    </Link>
                    <NavIcon
                        href="/messages"
                        active={pathname === '/messages' || pathname.startsWith('/messages')}
                        label="Chat"
                        icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>}
                    />
                    <NavIcon
                        href={`/profile/${currentUser?.username}`}
                        active={pathname === `/profile/${currentUser?.username}`}
                        label="Profile"
                        icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>}
                    />
                </div>
            </nav>
        </div>
    );
}
