(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/social-frontend/src/app/(app)/notifications/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// app/(app)/notifications/page.tsx
__turbopack_context__.s([
    "default",
    ()=>NotificationsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/social-frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/social-frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/social-frontend/src/lib/api.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function NotificationsPage() {
    _s();
    const [notifications, setNotifications] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NotificationsPage.useEffect": ()=>{
            loadNotifications();
        }
    }["NotificationsPage.useEffect"], []); // [] -> empty dependency array means this effect runs only once after the initial render
    const loadNotifications = async ()=>{
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get("/api/notifications", {
                params: {
                    unreadOnly: false,
                    page: 0,
                    size: 50
                }
            });
            setNotifications(response.data.content);
        } catch (error) {
            console.error("Failed to load notifications:", error);
        } finally{
            setLoading(false);
        }
    };
    const markAsRead = async (id)=>{
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].put(`/api/notifications/${id}/read`);
            setNotifications((prev)=>prev.map((n)=>n.id === id ? {
                        ...n,
                        read: true
                    } : n));
        } catch (error_0) {
            console.error("Failed to mark as read:", error_0);
        }
    };
    const markAllAsRead = async ()=>{
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].put("/api/notifications/mark-all-read");
            setNotifications((prev_0)=>prev_0.map((n_0)=>({
                        ...n_0,
                        read: true
                    })));
        } catch (error_1) {
            console.error("Failed to mark all as read:", error_1);
        }
    };
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-center py-8",
            children: "Loading notifications..."
        }, void 0, false, {
            fileName: "[project]/social-frontend/src/app/(app)/notifications/page.tsx",
            lineNumber: 53,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-2xl mx-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-2xl font-bold",
                        children: "Notifications"
                    }, void 0, false, {
                        fileName: "[project]/social-frontend/src/app/(app)/notifications/page.tsx",
                        lineNumber: 57,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: markAllAsRead,
                        className: "text-blue-600 hover:text-blue-700 text-sm",
                        children: "Mark all as read"
                    }, void 0, false, {
                        fileName: "[project]/social-frontend/src/app/(app)/notifications/page.tsx",
                        lineNumber: 58,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/social-frontend/src/app/(app)/notifications/page.tsx",
                lineNumber: 56,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-lg shadow divide-y",
                children: notifications.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "p-6 text-center text-gray-500",
                    children: "No notifications"
                }, void 0, false, {
                    fileName: "[project]/social-frontend/src/app/(app)/notifications/page.tsx",
                    lineNumber: 64,
                    columnNumber: 47
                }, this) : notifications.map((notification)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        onClick: ()=>!notification.read && markAsRead(notification.id),
                        className: `p-4 cursor-pointer hover:bg-gray-50 ${!notification.read ? "bg-blue-50" : ""}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-start justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-grow",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "font-semibold text-sm",
                                            children: notification.title
                                        }, void 0, false, {
                                            fileName: "[project]/social-frontend/src/app/(app)/notifications/page.tsx",
                                            lineNumber: 67,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-700 mt-1",
                                            children: notification.message
                                        }, void 0, false, {
                                            fileName: "[project]/social-frontend/src/app/(app)/notifications/page.tsx",
                                            lineNumber: 68,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-gray-500 mt-2",
                                            children: new Date(notification.createdAt).toLocaleString()
                                        }, void 0, false, {
                                            fileName: "[project]/social-frontend/src/app/(app)/notifications/page.tsx",
                                            lineNumber: 69,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/social-frontend/src/app/(app)/notifications/page.tsx",
                                    lineNumber: 66,
                                    columnNumber: 33
                                }, this),
                                !notification.read && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-2 h-2 bg-blue-600 rounded-full ml-4 mt-2"
                                }, void 0, false, {
                                    fileName: "[project]/social-frontend/src/app/(app)/notifications/page.tsx",
                                    lineNumber: 73,
                                    columnNumber: 56
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/social-frontend/src/app/(app)/notifications/page.tsx",
                            lineNumber: 65,
                            columnNumber: 29
                        }, this)
                    }, notification.id, false, {
                        fileName: "[project]/social-frontend/src/app/(app)/notifications/page.tsx",
                        lineNumber: 64,
                        columnNumber: 149
                    }, this))
            }, void 0, false, {
                fileName: "[project]/social-frontend/src/app/(app)/notifications/page.tsx",
                lineNumber: 63,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/social-frontend/src/app/(app)/notifications/page.tsx",
        lineNumber: 55,
        columnNumber: 10
    }, this);
}
_s(NotificationsPage, "b5Z8U3/R7VRYC3BVdCsp3rDTxkc=");
_c = NotificationsPage;
var _c;
__turbopack_context__.k.register(_c, "NotificationsPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=social-frontend_src_app_%28app%29_notifications_page_tsx_d74e8447._.js.map