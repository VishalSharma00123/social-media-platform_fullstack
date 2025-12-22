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
"[project]/social-frontend/src/app/(app)/messages/[conversationId]/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// app/(app)/messages/[conversationId]/page.tsx
__turbopack_context__.s([
    "default",
    ()=>ChatPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/social-frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/social-frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/social-frontend/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/social-frontend/src/lib/api.ts [app-client] (ecmascript)");
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
function ChatPage() {
    _s();
    const { conversationId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [conversation, setConversation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [newMessage, setNewMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [imageFile, setImageFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [contextMenu, setContextMenu] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const messagesEndRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const currentUser = __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["auth"].getUser();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatPage.useEffect": ()=>{
            if (conversationId) {
                loadConversation();
                loadMessages();
                markAsRead();
            }
        }
    }["ChatPage.useEffect"], [
        conversationId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatPage.useEffect": ()=>{
            scrollToBottom();
        }
    }["ChatPage.useEffect"], [
        messages
    ]);
    const loadConversation = async ()=>{
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/api/conversations/id/${conversationId}`);
            setConversation(response.data);
        } catch (error) {
            console.error("Failed to load conversation details:", error);
        }
    };
    const loadMessages = async ()=>{
        try {
            const response_0 = await __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/api/messages/conversation/${conversationId}`, {
                params: {
                    page: 0,
                    size: 100
                }
            });
            setMessages(response_0.data.content.reverse()); // Oldest first
        } catch (error_0) {
            console.error("Failed to load messages:", error_0);
        } finally{
            setLoading(false);
        }
    };
    const markAsRead = async ()=>{
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].put(`/api/conversations/${conversationId}/read`);
        } catch (error_1) {
            console.error("Failed to mark as read:", error_1);
        }
    };
    const scrollToBottom = ()=>{
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth"
        });
    };
    const handleSendMessage = async (e)=>{
        e.preventDefault();
        if (!newMessage.trim() && !imageFile) return;
        if (!conversation) return;
        try {
            if (imageFile) {
                // Send with media
                const formData = new FormData();
                formData.append("file", imageFile);
                formData.append("conversationId", conversationId);
                formData.append("receiverId", conversation.otherUserId);
                formData.append("content", newMessage);
                formData.append("type", "IMAGE");
                await __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post("/api/messages/send-with-media", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });
                setImageFile(null);
            } else {
                // Send text message
                await __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post("/api/messages/send", {
                    conversationId: conversationId,
                    receiverId: conversation.otherUserId,
                    content: newMessage,
                    type: "TEXT"
                });
            }
            setNewMessage("");
            loadMessages(); // Reload to show new message
        } catch (error_2) {
            console.error("Failed to send message:", error_2);
        }
    };
    const handleDeleteMessage = async (messageId)=>{
        if (!confirm("Are you sure you want to delete this message for everyone?")) return;
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].delete(`/api/messages/${messageId}`);
            // Optimistically update local state if needed, though WS will handle it
            setMessages((prev)=>prev.map((msg)=>msg.id === messageId ? {
                        ...msg,
                        deleted: true,
                        content: "This message was deleted",
                        mediaUrl: undefined
                    } : msg));
        } catch (error_3) {
            console.error("Failed to delete message:", error_3);
        }
    };
    const handleWebSocketMessage = (wsMessage)=>{
        if (wsMessage.type === "MESSAGE" && wsMessage.message && wsMessage.message.conversationId === conversationId) {
            setMessages((prev_0)=>{
                // Prevent duplicates
                if (prev_0.some((m)=>m.id === wsMessage.message.id)) return prev_0;
                return [
                    ...prev_0,
                    wsMessage.message
                ];
            });
        } else if (wsMessage.type === "DELETE" && wsMessage.messageId) {
            setMessages((prev_1)=>prev_1.map((msg_0)=>msg_0.id === wsMessage.messageId ? {
                        ...msg_0,
                        deleted: true,
                        content: "This message was deleted",
                        mediaUrl: undefined
                    } : msg_0));
        }
    };
    const handleImageSelect = (e_0)=>{
        const file = e_0.target.files?.[0];
        if (file) {
            setImageFile(file);
        }
    };
    const onContextMenu = (e_1, messageId_0)=>{
        e_1.preventDefault();
        setContextMenu({
            x: e_1.clientX,
            y: e_1.clientY,
            messageId: messageId_0
        });
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatPage.useEffect": ()=>{
            const handleClick = {
                "ChatPage.useEffect.handleClick": ()=>setContextMenu(null)
            }["ChatPage.useEffect.handleClick"];
            window.addEventListener('click', handleClick);
            return ({
                "ChatPage.useEffect": ()=>window.removeEventListener('click', handleClick)
            })["ChatPage.useEffect"];
        }
    }["ChatPage.useEffect"], []);
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center justify-center py-20 space-y-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-12 h-12 border-4 border-primary-100 border-t-primary-600 rounded-full animate-spin"
                }, void 0, false, {
                    fileName: "[project]/social-frontend/src/app/(app)/messages/[conversationId]/page.tsx",
                    lineNumber: 159,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-surface-500 font-bold uppercase tracking-widest text-xs",
                    children: "Loading conversation..."
                }, void 0, false, {
                    fileName: "[project]/social-frontend/src/app/(app)/messages/[conversationId]/page.tsx",
                    lineNumber: 160,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/social-frontend/src/app/(app)/messages/[conversationId]/page.tsx",
            lineNumber: 158,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-4xl mx-auto h-[calc(100vh-140px)] flex flex-col bg-white rounded-3xl shadow-xl border border-surface-200 overflow-hidden animate-in",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$src$2f$components$2f$ChatSocket$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                onMessage: handleWebSocketMessage
            }, void 0, false, {
                fileName: "[project]/social-frontend/src/app/(app)/messages/[conversationId]/page.tsx",
                lineNumber: 165,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-6 py-4 border-b border-surface-100 bg-white/80 backdrop-blur-md flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center space-x-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold overflow-hidden border-2 border-white shadow-sm",
                                children: conversation?.otherUserProfilePicture ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: conversation.otherUserProfilePicture.startsWith('http') ? conversation.otherUserProfilePicture : `http://localhost:8082${conversation.otherUserProfilePicture}`,
                                    alt: conversation.otherUserName,
                                    className: "w-full h-full object-cover"
                                }, void 0, false, {
                                    fileName: "[project]/social-frontend/src/app/(app)/messages/[conversationId]/page.tsx",
                                    lineNumber: 171,
                                    columnNumber: 66
                                }, this) : conversation?.otherUserName?.charAt(0).toUpperCase() || "C"
                            }, void 0, false, {
                                fileName: "[project]/social-frontend/src/app/(app)/messages/[conversationId]/page.tsx",
                                lineNumber: 170,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "font-bold text-surface-900 leading-tight",
                                        children: conversation?.otherUserName || "Conversation"
                                    }, void 0, false, {
                                        fileName: "[project]/social-frontend/src/app/(app)/messages/[conversationId]/page.tsx",
                                        lineNumber: 174,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center space-x-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "w-2 h-2 bg-green-500 rounded-full animate-pulse"
                                            }, void 0, false, {
                                                fileName: "[project]/social-frontend/src/app/(app)/messages/[conversationId]/page.tsx",
                                                lineNumber: 178,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] font-bold text-surface-400 uppercase tracking-widest",
                                                children: "Active Now"
                                            }, void 0, false, {
                                                fileName: "[project]/social-frontend/src/app/(app)/messages/[conversationId]/page.tsx",
                                                lineNumber: 179,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/social-frontend/src/app/(app)/messages/[conversationId]/page.tsx",
                                        lineNumber: 177,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/social-frontend/src/app/(app)/messages/[conversationId]/page.tsx",
                                lineNumber: 173,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/social-frontend/src/app/(app)/messages/[conversationId]/page.tsx",
                        lineNumber: 169,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center space-x-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "p-2 text-surface-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xl",
                                    children: "📞"
                                }, void 0, false, {
                                    fileName: "[project]/social-frontend/src/app/(app)/messages/[conversationId]/page.tsx",
                                    lineNumber: 186,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/social-frontend/src/app/(app)/messages/[conversationId]/page.tsx",
                                lineNumber: 185,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "p-2 text-surface-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xl",
                                    children: "📹"
                                }, void 0, false, {
                                    fileName: "[project]/social-frontend/src/app/(app)/messages/[conversationId]/page.tsx",
                                    lineNumber: 189,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/social-frontend/src/app/(app)/messages/[conversationId]/page.tsx",
                                lineNumber: 188,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "p-2 text-surface-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all ml-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xl",
                                    children: "ℹ️"
                                }, void 0, false, {
                                    fileName: "[project]/social-frontend/src/app/(app)/messages/[conversationId]/page.tsx",
                                    lineNumber: 192,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/social-frontend/src/app/(app)/messages/[conversationId]/page.tsx",
                                lineNumber: 191,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/social-frontend/src/app/(app)/messages/[conversationId]/page.tsx",
                        lineNumber: 184,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/social-frontend/src/app/(app)/messages/[conversationId]/page.tsx",
                lineNumber: 168,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-grow overflow-y-auto bg-surface-50/30 p-6 space-y-4",
                children: [
                    messages.length > 0 ? messages.map((message)=>{
                        const isOwn = message.senderId === currentUser?.id;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `flex ${isOwn ? "justify-end" : "justify-start"} group animate-in relative mb-4`,
                            onContextMenu: (e_2)=>isOwn && !message.deleted && onContextMenu(e_2, message.id),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `max-w-[75%] px-4 py-2.5 shadow-sm transition-all ${isOwn ? "bg-primary-600 text-white rounded-2xl rounded-tr-none" : "bg-white text-surface-800 rounded-2xl rounded-tl-none border border-surface-100"} ${message.deleted ? "!bg-surface-100 !text-surface-400 italic shadow-none border-dashed" : ""}`,
                                children: [
                                    !message.deleted && message.mediaUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-2 rounded-lg overflow-hidden border border-black/5",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: message.mediaUrl.startsWith('http') ? message.mediaUrl : `http://localhost:8082${message.mediaUrl}`,
                                            alt: "Attachment",
                                            className: "max-w-full h-auto hover:scale-105 transition-transform cursor-pointer"
                                        }, void 0, false, {
                                            fileName: "[project]/social-frontend/src/app/(app)/messages/[conversationId]/page.tsx",
                                            lineNumber: 204,
                                            columnNumber: 45
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/social-frontend/src/app/(app)/messages/[conversationId]/page.tsx",
                                        lineNumber: 203,
                                        columnNumber: 78
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[15px] leading-relaxed select-text",
                                        children: message.deleted ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "flex items-center space-x-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    xmlns: "http://www.w3.org/2000/svg",
                                                    className: "h-3.5 w-3.5",
                                                    fill: "none",
                                                    viewBox: "0 0 24 24",
                                                    stroke: "currentColor",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        strokeLinecap: "round",
                                                        strokeLinejoin: "round",
                                                        strokeWidth: 2,
                                                        d: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    }, void 0, false, {
                                                        fileName: "[project]/social-frontend/src/app/(app)/messages/[conversationId]/page.tsx",
                                                        lineNumber: 209,
                                                        columnNumber: 53
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/social-frontend/src/app/(app)/messages/[conversationId]/page.tsx",
                                                    lineNumber: 208,
                                                    columnNumber: 49
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: message.content
                                                }, void 0, false, {
                                                    fileName: "[project]/social-frontend/src/app/(app)/messages/[conversationId]/page.tsx",
                                                    lineNumber: 211,
                                                    columnNumber: 49
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/social-frontend/src/app/(app)/messages/[conversationId]/page.tsx",
                                            lineNumber: 207,
                                            columnNumber: 60
                                        }, this) : message.content
                                    }, void 0, false, {
                                        fileName: "[project]/social-frontend/src/app/(app)/messages/[conversationId]/page.tsx",
                                        lineNumber: 206,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `text-[10px] mt-1 font-bold flex items-center ${isOwn ? "text-primary-100 justify-end" : "text-surface-400"}`,
                                        children: [
                                            new Date(message.createdAt).toLocaleTimeString([], {
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            }),
                                            isOwn && !message.deleted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "ml-1 opacity-70",
                                                children: "✓✓"
                                            }, void 0, false, {
                                                fileName: "[project]/social-frontend/src/app/(app)/messages/[conversationId]/page.tsx",
                                                lineNumber: 219,
                                                columnNumber: 71
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/social-frontend/src/app/(app)/messages/[conversationId]/page.tsx",
                                        lineNumber: 214,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/social-frontend/src/app/(app)/messages/[conversationId]/page.tsx",
                                lineNumber: 202,
                                columnNumber: 33
                            }, this)
                        }, message.id, false, {
                            fileName: "[project]/social-frontend/src/app/(app)/messages/[conversationId]/page.tsx",
                            lineNumber: 201,
                            columnNumber: 16
                        }, this);
                    }) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-full flex flex-col items-center justify-center opacity-40",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-6xl mb-4",
                                children: "👋"
                            }, void 0, false, {
                                fileName: "[project]/social-frontend/src/app/(app)/messages/[conversationId]/page.tsx",
                                lineNumber: 224,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-bold uppercase tracking-widest text-xs",
                                children: "Say hello!"
                            }, void 0, false, {
                                fileName: "[project]/social-frontend/src/app/(app)/messages/[conversationId]/page.tsx",
                                lineNumber: 225,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/social-frontend/src/app/(app)/messages/[conversationId]/page.tsx",
                        lineNumber: 223,
                        columnNumber: 12
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: messagesEndRef
                    }, void 0, false, {
                        fileName: "[project]/social-frontend/src/app/(app)/messages/[conversationId]/page.tsx",
                        lineNumber: 227,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/social-frontend/src/app/(app)/messages/[conversationId]/page.tsx",
                lineNumber: 198,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4 bg-white border-t border-surface-100",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: handleSendMessage,
                    className: "relative flex items-center",
                    children: [
                        imageFile && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute bottom-full left-0 mb-4 bg-white p-2 rounded-2xl shadow-xl border border-surface-200 animate-in flex items-center space-x-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-12 h-12 bg-surface-100 rounded-lg flex items-center justify-center text-xl",
                                    children: "🖼️"
                                }, void 0, false, {
                                    fileName: "[project]/social-frontend/src/app/(app)/messages/[conversationId]/page.tsx",
                                    lineNumber: 234,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-grow min-w-[100px]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs font-bold text-surface-900 truncate max-w-[150px]",
                                            children: imageFile.name
                                        }, void 0, false, {
                                            fileName: "[project]/social-frontend/src/app/(app)/messages/[conversationId]/page.tsx",
                                            lineNumber: 236,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[10px] text-surface-400",
                                            children: "Ready to send"
                                        }, void 0, false, {
                                            fileName: "[project]/social-frontend/src/app/(app)/messages/[conversationId]/page.tsx",
                                            lineNumber: 237,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/social-frontend/src/app/(app)/messages/[conversationId]/page.tsx",
                                    lineNumber: 235,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>setImageFile(null),
                                    className: "bg-red-50 text-red-500 p-1.5 rounded-full hover:bg-red-100 transition-colors",
                                    children: "✕"
                                }, void 0, false, {
                                    fileName: "[project]/social-frontend/src/app/(app)/messages/[conversationId]/page.tsx",
                                    lineNumber: 239,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/social-frontend/src/app/(app)/messages/[conversationId]/page.tsx",
                            lineNumber: 233,
                            columnNumber: 35
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-grow relative group flex items-center space-x-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "p-2.5 text-surface-400 hover:text-primary-600 hover:bg-primary-50 rounded-full cursor-pointer transition-all",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "file",
                                            accept: "image/*",
                                            onChange: handleImageSelect,
                                            className: "hidden"
                                        }, void 0, false, {
                                            fileName: "[project]/social-frontend/src/app/(app)/messages/[conversationId]/page.tsx",
                                            lineNumber: 246,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-2xl",
                                            children: "📎"
                                        }, void 0, false, {
                                            fileName: "[project]/social-frontend/src/app/(app)/messages/[conversationId]/page.tsx",
                                            lineNumber: 247,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/social-frontend/src/app/(app)/messages/[conversationId]/page.tsx",
                                    lineNumber: 245,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-grow relative",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            value: newMessage,
                                            onChange: (e_3)=>setNewMessage(e_3.target.value),
                                            placeholder: "Type a message...",
                                            className: "w-full bg-surface-100 border-none focus:ring-2 focus:ring-primary-100 rounded-2xl px-5 py-3 text-[15px] placeholder-surface-400 transition-all pr-12"
                                        }, void 0, false, {
                                            fileName: "[project]/social-frontend/src/app/(app)/messages/[conversationId]/page.tsx",
                                            lineNumber: 251,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            className: "absolute right-3 top-1/2 -translate-y-1/2 text-xl opacity-30 hover:opacity-100 transition-opacity",
                                            children: "😊"
                                        }, void 0, false, {
                                            fileName: "[project]/social-frontend/src/app/(app)/messages/[conversationId]/page.tsx",
                                            lineNumber: 252,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/social-frontend/src/app/(app)/messages/[conversationId]/page.tsx",
                                    lineNumber: 250,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "submit",
                                    disabled: !newMessage.trim() && !imageFile,
                                    className: "bg-primary-600 text-white w-12 h-12 rounded-2xl hover:bg-primary-700 disabled:bg-surface-200 shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center justify-center flex-shrink-0",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xl -rotate-45 translate-x-0.5 -translate-y-0.5",
                                        children: "➤"
                                    }, void 0, false, {
                                        fileName: "[project]/social-frontend/src/app/(app)/messages/[conversationId]/page.tsx",
                                        lineNumber: 258,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/social-frontend/src/app/(app)/messages/[conversationId]/page.tsx",
                                    lineNumber: 257,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/social-frontend/src/app/(app)/messages/[conversationId]/page.tsx",
                            lineNumber: 244,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/social-frontend/src/app/(app)/messages/[conversationId]/page.tsx",
                    lineNumber: 232,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/social-frontend/src/app/(app)/messages/[conversationId]/page.tsx",
                lineNumber: 231,
                columnNumber: 13
            }, this),
            contextMenu && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed z-50 bg-white shadow-2xl rounded-2xl border border-surface-100 py-2 min-w-[160px] animate-in slide-in-from-top-1",
                style: {
                    top: contextMenu.y,
                    left: contextMenu.x
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: (e_4)=>{
                            e_4.stopPropagation();
                            handleDeleteMessage(contextMenu.messageId);
                            setContextMenu(null);
                        },
                        className: "w-full px-4 py-2.5 text-left text-sm font-bold text-red-500 hover:bg-red-50 flex items-center space-x-3 transition-colors",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                xmlns: "http://www.w3.org/2000/svg",
                                className: "h-4 w-4",
                                fill: "none",
                                viewBox: "0 0 24 24",
                                stroke: "currentColor",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                    d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                }, void 0, false, {
                                    fileName: "[project]/social-frontend/src/app/(app)/messages/[conversationId]/page.tsx",
                                    lineNumber: 274,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/social-frontend/src/app/(app)/messages/[conversationId]/page.tsx",
                                lineNumber: 273,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Delete Message"
                            }, void 0, false, {
                                fileName: "[project]/social-frontend/src/app/(app)/messages/[conversationId]/page.tsx",
                                lineNumber: 276,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/social-frontend/src/app/(app)/messages/[conversationId]/page.tsx",
                        lineNumber: 268,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "w-full px-4 py-2.5 text-left text-sm font-bold text-surface-600 hover:bg-surface-50 flex items-center space-x-3 transition-colors",
                        onClick: (e_5)=>{
                            e_5.stopPropagation();
                            setContextMenu(null);
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                xmlns: "http://www.w3.org/2000/svg",
                                className: "h-4 w-4",
                                fill: "none",
                                viewBox: "0 0 24 24",
                                stroke: "currentColor",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                    d: "M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                                }, void 0, false, {
                                    fileName: "[project]/social-frontend/src/app/(app)/messages/[conversationId]/page.tsx",
                                    lineNumber: 283,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/social-frontend/src/app/(app)/messages/[conversationId]/page.tsx",
                                lineNumber: 282,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Copy Text"
                            }, void 0, false, {
                                fileName: "[project]/social-frontend/src/app/(app)/messages/[conversationId]/page.tsx",
                                lineNumber: 285,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/social-frontend/src/app/(app)/messages/[conversationId]/page.tsx",
                        lineNumber: 278,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/social-frontend/src/app/(app)/messages/[conversationId]/page.tsx",
                lineNumber: 264,
                columnNumber: 29
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/social-frontend/src/app/(app)/messages/[conversationId]/page.tsx",
        lineNumber: 163,
        columnNumber: 10
    }, this);
}
_s(ChatPage, "XIp0TWjQqlywoR+tplurRDoholo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$social$2d$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"]
    ];
});
_c = ChatPage;
var _c;
__turbopack_context__.k.register(_c, "ChatPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=social-frontend_src_79a19350._.js.map