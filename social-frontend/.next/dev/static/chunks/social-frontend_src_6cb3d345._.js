(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/social-frontend/src/components/ChatSocket.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// components/ChatSocket.tsx
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/social-frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f40$stomp$2f$stompjs$2f$esm6$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/social-frontend/node_modules/@stomp/stompjs/esm6/client.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$sockjs$2d$client$2f$lib$2f$entry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/social-frontend/node_modules/sockjs-client/lib/entry.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/social-frontend/src/lib/auth.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const ChatSocket = /*#__PURE__*/ _s((0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c = _s(({ onMessage, onTyping, onConnect }, ref)=>{
    _s();
    const clientRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const isConnectedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    // Expose methods to parent component
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useImperativeHandle"])(ref, {
        "ChatSocket.useImperativeHandle": ()=>({
                sendMessage: ({
                    "ChatSocket.useImperativeHandle": (receiverId, content, conversationId)=>{
                        if (!clientRef.current || !isConnectedRef.current) {
                            console.error("❌ WebSocket not connected");
                            return;
                        }
                        const messageRequest = {
                            receiverId,
                            content,
                            conversationId
                        };
                        console.log("📤 Sending message:", messageRequest);
                        clientRef.current.publish({
                            destination: "/app/chat.send",
                            body: JSON.stringify(messageRequest)
                        });
                    }
                })["ChatSocket.useImperativeHandle"],
                sendTypingIndicator: ({
                    "ChatSocket.useImperativeHandle": (receiverId, isTyping)=>{
                        if (!clientRef.current || !isConnectedRef.current) {
                            return;
                        }
                        const typingMessage = {
                            type: "TYPING",
                            userId: receiverId,
                            isTyping,
                            timestamp: Date.now()
                        };
                        clientRef.current.publish({
                            destination: "/app/chat.typing",
                            body: JSON.stringify(typingMessage)
                        });
                    }
                })["ChatSocket.useImperativeHandle"],
                isConnected: ({
                    "ChatSocket.useImperativeHandle": ()=>isConnectedRef.current
                })["ChatSocket.useImperativeHandle"]
            })
    }["ChatSocket.useImperativeHandle"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatSocket.useEffect": ()=>{
            const userId = __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["auth"].getUser()?.id;
            if (!userId) return;
            // Create WebSocket connection via SockJS
            const socket = new __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$sockjs$2d$client$2f$lib$2f$entry$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]("http://localhost:8080/ws");
            // Create STOMP client
            const stompClient = new __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f40$stomp$2f$stompjs$2f$esm6$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Client"]({
                webSocketFactory: {
                    "ChatSocket.useEffect": ()=>socket
                }["ChatSocket.useEffect"],
                reconnectDelay: 5000,
                debug: {
                    "ChatSocket.useEffect": (str)=>console.log("STOMP:", str)
                }["ChatSocket.useEffect"],
                onConnect: {
                    "ChatSocket.useEffect": ()=>{
                        console.log("✅ WebSocket connected");
                        isConnectedRef.current = true;
                        onConnect?.();
                        // Subscribe to user's message queue
                        stompClient.subscribe(`/user/${userId}/queue/messages`, {
                            "ChatSocket.useEffect": (message)=>{
                                const body = JSON.parse(message.body);
                                console.log("📩 Received message:", body);
                                onMessage(body);
                            }
                        }["ChatSocket.useEffect"]);
                        // Subscribe to typing indicators
                        stompClient.subscribe(`/user/${userId}/queue/typing`, {
                            "ChatSocket.useEffect": (message)=>{
                                const body = JSON.parse(message.body);
                                console.log("⌨️ Typing indicator:", body);
                                onTyping?.(body);
                            }
                        }["ChatSocket.useEffect"]);
                    }
                }["ChatSocket.useEffect"],
                onStompError: {
                    "ChatSocket.useEffect": (frame)=>{
                        console.error("STOMP error:", frame);
                        isConnectedRef.current = false;
                    }
                }["ChatSocket.useEffect"],
                onDisconnect: {
                    "ChatSocket.useEffect": ()=>{
                        console.log("❌ WebSocket disconnected");
                        isConnectedRef.current = false;
                    }
                }["ChatSocket.useEffect"]
            });
            stompClient.activate();
            clientRef.current = stompClient;
            return ({
                "ChatSocket.useEffect": ()=>{
                    isConnectedRef.current = false;
                    stompClient.deactivate();
                }
            })["ChatSocket.useEffect"];
        }
    }["ChatSocket.useEffect"], [
        onMessage,
        onTyping,
        onConnect
    ]);
    return null; // This is a headless component
}, "n7r6TT6CAAkOApEgnO1K8IcTsQM=")), "n7r6TT6CAAkOApEgnO1K8IcTsQM=");
_c1 = ChatSocket;
ChatSocket.displayName = "ChatSocket";
const __TURBOPACK__default__export__ = ChatSocket;
var _c, _c1;
__turbopack_context__.k.register(_c, "ChatSocket$forwardRef");
__turbopack_context__.k.register(_c1, "ChatSocket");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/social-frontend/src/app/(app)/messages/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// app/(app)/messages/page.tsx
__turbopack_context__.s([
    "default",
    ()=>ConversationsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/social-frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/social-frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/social-frontend/src/lib/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/social-frontend/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/social-frontend/src/lib/auth.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$src$2f$components$2f$ChatSocket$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/social-frontend/src/components/ChatSocket.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function ConversationsPage() {
    _s();
    const [conversations, setConversations] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const currentUser = __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["auth"].getUser();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ConversationsPage.useEffect": ()=>{
            loadConversations();
        }
    }["ConversationsPage.useEffect"], []);
    const loadConversations = async ()=>{
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get("/api/conversations");
            setConversations(response.data);
        } catch (error) {
            console.error("Failed to load conversations:", error);
        } finally{
            setLoading(false);
        }
    };
    const handleWebSocketMessage = (wsMessage)=>{
        if (wsMessage.type === "MESSAGE" && wsMessage.message) {
            setConversations((prev)=>{
                const convId = wsMessage.message.conversationId;
                const existingIndex = prev.findIndex((c)=>c.id === convId);
                if (existingIndex > -1) {
                    const updated = [
                        ...prev
                    ];
                    updated[existingIndex] = {
                        ...updated[existingIndex],
                        lastMessage: wsMessage.message.content,
                        lastMessageTime: wsMessage.message.createdAt,
                        updatedAt: wsMessage.message.createdAt,
                        unreadCount: updated[existingIndex].unreadCount + (wsMessage.userId !== currentUser?.id ? 1 : 0)
                    };
                    // Move to top
                    const movedItem = updated.splice(existingIndex, 1)[0];
                    return [
                        movedItem,
                        ...updated
                    ];
                } else {
                    // New conversation - reload list to be safe and fetch user details
                    loadConversations();
                    return prev;
                }
            });
        }
    };
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center justify-center py-20 space-y-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-12 h-12 border-4 border-primary-100 border-t-primary-600 rounded-full animate-spin"
                }, void 0, false, {
                    fileName: "[project]/social-frontend/src/app/(app)/messages/page.tsx",
                    lineNumber: 54,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-surface-500 font-bold uppercase tracking-widest text-xs",
                    children: "Loading conversations..."
                }, void 0, false, {
                    fileName: "[project]/social-frontend/src/app/(app)/messages/page.tsx",
                    lineNumber: 55,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/social-frontend/src/app/(app)/messages/page.tsx",
            lineNumber: 53,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-4xl mx-auto space-y-8 animate-in",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$src$2f$components$2f$ChatSocket$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                onMessage: handleWebSocketMessage
            }, void 0, false, {
                fileName: "[project]/social-frontend/src/app/(app)/messages/page.tsx",
                lineNumber: 59,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-3xl font-black text-surface-900 tracking-tight",
                        children: "Messages"
                    }, void 0, false, {
                        fileName: "[project]/social-frontend/src/app/(app)/messages/page.tsx",
                        lineNumber: 61,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "btn-primary px-6 py-2 rounded-full text-sm",
                        children: "New Message"
                    }, void 0, false, {
                        fileName: "[project]/social-frontend/src/app/(app)/messages/page.tsx",
                        lineNumber: 62,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/social-frontend/src/app/(app)/messages/page.tsx",
                lineNumber: 60,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 gap-4",
                children: conversations.length > 0 ? conversations.map((conv)=>{
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: `/messages/${conv.id}`,
                        className: "card p-5 bg-white border-surface-100 hover:border-primary-200 hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-between group",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center space-x-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold text-xl overflow-hidden border-2 border-white shadow-sm transition-transform group-hover:scale-105",
                                                children: conv.otherUserProfilePicture ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    src: conv.otherUserProfilePicture.startsWith('http') ? conv.otherUserProfilePicture : `http://localhost:8082${conv.otherUserProfilePicture}`,
                                                    alt: conv.otherUserName,
                                                    className: "w-full h-full object-cover"
                                                }, void 0, false, {
                                                    fileName: "[project]/social-frontend/src/app/(app)/messages/page.tsx",
                                                    lineNumber: 71,
                                                    columnNumber: 77
                                                }, this) : conv.otherUserName?.charAt(0).toUpperCase() || "C"
                                            }, void 0, false, {
                                                fileName: "[project]/social-frontend/src/app/(app)/messages/page.tsx",
                                                lineNumber: 70,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"
                                            }, void 0, false, {
                                                fileName: "[project]/social-frontend/src/app/(app)/messages/page.tsx",
                                                lineNumber: 73,
                                                columnNumber: 41
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/social-frontend/src/app/(app)/messages/page.tsx",
                                        lineNumber: 69,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center space-x-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "font-bold text-surface-900 group-hover:text-primary-600 transition-colors",
                                                        children: conv.otherUserName
                                                    }, void 0, false, {
                                                        fileName: "[project]/social-frontend/src/app/(app)/messages/page.tsx",
                                                        lineNumber: 78,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[10px] font-bold text-surface-400 uppercase tracking-widest",
                                                        children: [
                                                            "• ",
                                                            new Date(conv.updatedAt).toLocaleDateString()
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/social-frontend/src/app/(app)/messages/page.tsx",
                                                        lineNumber: 81,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/social-frontend/src/app/(app)/messages/page.tsx",
                                                lineNumber: 77,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-surface-500 line-clamp-1 max-w-md",
                                                children: conv.lastMessage || "No messages yet"
                                            }, void 0, false, {
                                                fileName: "[project]/social-frontend/src/app/(app)/messages/page.tsx",
                                                lineNumber: 83,
                                                columnNumber: 41
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/social-frontend/src/app/(app)/messages/page.tsx",
                                        lineNumber: 76,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/social-frontend/src/app/(app)/messages/page.tsx",
                                lineNumber: 68,
                                columnNumber: 33
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center space-x-4",
                                children: [
                                    conv.unreadCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "bg-primary-600 text-white text-[10px] font-bold px-2 py-1 rounded-full min-w-[20px] text-center shadow-md",
                                        children: conv.unreadCount
                                    }, void 0, false, {
                                        fileName: "[project]/social-frontend/src/app/(app)/messages/page.tsx",
                                        lineNumber: 90,
                                        columnNumber: 62
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-surface-300 group-hover:text-primary-400 transition-colors text-xl",
                                        children: "›"
                                    }, void 0, false, {
                                        fileName: "[project]/social-frontend/src/app/(app)/messages/page.tsx",
                                        lineNumber: 93,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/social-frontend/src/app/(app)/messages/page.tsx",
                                lineNumber: 89,
                                columnNumber: 33
                            }, this)
                        ]
                    }, conv.id, true, {
                        fileName: "[project]/social-frontend/src/app/(app)/messages/page.tsx",
                        lineNumber: 67,
                        columnNumber: 16
                    }, this);
                }) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center py-32 bg-white rounded-3xl border border-dashed border-surface-200",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-6xl block mb-6",
                            children: "💬"
                        }, void 0, false, {
                            fileName: "[project]/social-frontend/src/app/(app)/messages/page.tsx",
                            lineNumber: 97,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-surface-500 font-bold text-lg",
                            children: "No conversations yet"
                        }, void 0, false, {
                            fileName: "[project]/social-frontend/src/app/(app)/messages/page.tsx",
                            lineNumber: 98,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-surface-400 text-sm mt-2 mb-8",
                            children: "Start messaging your friends to see them here!"
                        }, void 0, false, {
                            fileName: "[project]/social-frontend/src/app/(app)/messages/page.tsx",
                            lineNumber: 99,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/discover",
                            className: "btn-primary px-8 py-3 rounded-full",
                            children: "Find People to Chat"
                        }, void 0, false, {
                            fileName: "[project]/social-frontend/src/app/(app)/messages/page.tsx",
                            lineNumber: 100,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/social-frontend/src/app/(app)/messages/page.tsx",
                    lineNumber: 96,
                    columnNumber: 12
                }, this)
            }, void 0, false, {
                fileName: "[project]/social-frontend/src/app/(app)/messages/page.tsx",
                lineNumber: 65,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/social-frontend/src/app/(app)/messages/page.tsx",
        lineNumber: 58,
        columnNumber: 10
    }, this);
}
_s(ConversationsPage, "VioyIQZSz3gKtrbXiAHZOh459DE=");
_c = ConversationsPage;
var _c;
__turbopack_context__.k.register(_c, "ConversationsPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=social-frontend_src_6cb3d345._.js.map