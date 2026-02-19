// app/(app)/notifications/page.tsx
"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Notification, PageResponse } from "@/lib/types";

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadNotifications();
    }, []);

    const loadNotifications = async () => {
        try {
            const response = await api.get<PageResponse<Notification>>(
                "/api/notifications",
                { params: { unreadOnly: false, page: 0, size: 50 } }
            );
            setNotifications(response.data.content);
        } catch (error) {
            console.error("Failed to load notifications:", error);
        } finally {
            setLoading(false);
        }
    };

    const markAsRead = async (id: string) => {
        try {
            await api.put(`/api/notifications/${id}/read`);
            setNotifications((prev) =>
                prev.map((n) => (n.id === id ? { ...n, read: true } : n))
            );
        } catch (error) {
            console.error("Failed to mark as read:", error);
        }
    };

    const markAllAsRead = async () => {
        try {
            await api.put("/api/notifications/mark-all-read");
            setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
        } catch (error) {
            console.error("Failed to mark all as read:", error);
        }
    };

    const deleteNotification = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            await api.delete(`/api/notifications/${id}`);
            setNotifications((prev) => prev.filter((n) => n.id !== id));
        } catch (error) {
            console.error("Failed to delete notification:", error);
        }
    };

    const deleteAllNotifications = async () => {
        if (!confirm("Are you sure you want to delete all notifications?")) return;
        try {
            await api.delete("/api/notifications");
            setNotifications([]);
        } catch (error) {
            console.error("Failed to delete all notifications:", error);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <div className="w-12 h-12 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
                <p className="text-surface-500 font-bold uppercase tracking-widest text-xs">Loading notifications...</p>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto space-y-8 animate-fade-in pb-20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h1 className="text-3xl font-black text-white tracking-tight">Notifications</h1>
                <div className="flex items-center gap-2 self-start sm:self-auto w-full sm:w-auto">
                    {notifications.length > 0 && (
                        <button
                            onClick={deleteAllNotifications}
                            className="flex-1 sm:flex-none text-[10px] sm:text-xs font-black text-red-500 hover:text-red-400 uppercase tracking-widest bg-red-500/10 hover:bg-red-500/20 px-4 py-2.5 rounded-xl transition-all active:scale-95 whitespace-nowrap"
                        >
                            Clear All
                        </button>
                    )}
                    <button
                        onClick={markAllAsRead}
                        className="flex-1 sm:flex-none text-[10px] sm:text-xs font-black text-primary-500 hover:text-primary-400 uppercase tracking-widest bg-primary-500/10 hover:bg-primary-500/20 px-4 py-2.5 rounded-xl transition-all active:scale-95 whitespace-nowrap"
                    >
                        Mark all read
                    </button>
                </div>
            </div>

            <div className="glass-card overflow-hidden divide-y divide-surface-200/50 bg-surface-100/50 border border-surface-200/50">
                {notifications.length === 0 ? (
                    <div className="py-24 text-center">
                        <div className="w-16 h-16 bg-surface-200/50 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 shadow-inner grayscale opacity-50">
                            🔔
                        </div>
                        <p className="text-surface-400 font-bold uppercase tracking-widest text-[11px]">All caught up!</p>
                    </div>
                ) : (
                    notifications.map((notification, idx) => (
                        <div
                            key={notification.id}
                            onClick={() => !notification.read && markAsRead(notification.id)}
                            className={`p-5 cursor-pointer group transition-all duration-300 relative overflow-hidden ${!notification.read ? "bg-primary-900/10 hover:bg-primary-900/20" : "hover:bg-surface-200/50"
                                } stagger-${(idx % 3) + 1}`}
                        >
                            <div className="flex items-start space-x-4">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm transition-transform group-hover:scale-110 ${!notification.read ? "bg-primary-600 text-white shadow-primary-500/20" : "bg-surface-200 text-surface-400"
                                    }`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
                                </div>
                                <div className="flex-grow min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <p className={`text-sm truncate ${!notification.read ? "font-black text-white" : "font-bold text-surface-400"}`}>{notification.title}</p>
                                        <div className="flex items-center space-x-2 ml-4 flex-shrink-0">
                                            <p className="text-[10px] font-bold text-surface-500 uppercase tracking-wider">
                                                {new Date(notification.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                                            </p>
                                            <button
                                                onClick={(e) => deleteNotification(notification.id, e)}
                                                className="opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-red-500/10 text-surface-500 hover:text-red-500"
                                                title="Delete notification"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M18 6L6 18" /><path d="M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    <p className={`text-[13px] leading-relaxed ${!notification.read ? "text-surface-300 font-medium" : "text-surface-500"}`}>{notification.message}</p>
                                </div>
                                {!notification.read && (
                                    <div className="absolute right-0 top-0 w-1.5 h-full bg-primary-500/50" />
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
