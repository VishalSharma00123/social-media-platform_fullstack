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
    }, []); // [] -> empty dependency array means this effect runs only once after the initial render

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

    if (loading) {
        return <div className="text-center py-8">Loading notifications...</div>;
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Notifications</h1>
                <button
                    onClick={markAllAsRead}
                    className="text-blue-600 hover:text-blue-700 text-sm"
                >
                    Mark all as read
                </button>
            </div>

            <div className="bg-white rounded-lg shadow divide-y">
                {notifications.length === 0 ? (
                    <p className="p-6 text-center text-gray-500">No notifications</p>
                ) : (
                    notifications.map((notification) => (
                        <div
                            key={notification.id}
                            onClick={() => !notification.read && markAsRead(notification.id)}
                            className={`p-4 cursor-pointer hover:bg-gray-50 ${!notification.read ? "bg-blue-50" : ""
                                }`}
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex-grow">
                                    <p className="font-semibold text-sm">{notification.title}</p>
                                    <p className="text-gray-700 mt-1">{notification.message}</p>
                                    <p className="text-xs text-gray-500 mt-2">
                                        {new Date(notification.createdAt).toLocaleString()}
                                    </p>
                                </div>
                                {!notification.read && (
                                    <div className="w-2 h-2 bg-blue-600 rounded-full ml-4 mt-2"></div>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
