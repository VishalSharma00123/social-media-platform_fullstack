// components/ChatSocket.tsx

"use client";
import { useEffect, useRef, useImperativeHandle, forwardRef, useCallback } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { auth } from "@/lib/auth";

interface Props {
    onMessage: (message: any) => void;
    onTyping?: (data: any) => void;
    onConnect?: () => void;
}

export interface ChatSocketHandle {
    sendMessage: (receiverId: string, content: string, conversationId?: string) => void;
    sendTypingIndicator: (receiverId: string, isTyping: boolean) => void;
    isConnected: () => boolean;
}

const ChatSocket = forwardRef<ChatSocketHandle, Props>(
    ({ onMessage, onTyping, onConnect }, ref) => {
        const clientRef = useRef<Client | null>(null);
        const isConnectedRef = useRef(false);

        // ✅ FIX: Store callbacks in refs so the STOMP subscription
        // always calls the LATEST version of the callbacks,
        // avoiding the stale closure problem.
        const onMessageRef = useRef(onMessage);
        const onTypingRef = useRef(onTyping);
        const onConnectRef = useRef(onConnect);

        // Keep refs up-to-date on every render
        useEffect(() => {
            onMessageRef.current = onMessage;
        }, [onMessage]);

        useEffect(() => {
            onTypingRef.current = onTyping;
        }, [onTyping]);

        useEffect(() => {
            onConnectRef.current = onConnect;
        }, [onConnect]);

        // Expose methods to parent component
        useImperativeHandle(ref, () => ({
            sendMessage: (receiverId: string, content: string, conversationId?: string) => {
                if (!clientRef.current || !isConnectedRef.current) {
                    console.error("❌ WebSocket not connected");
                    return;
                }

                const messageRequest = {
                    receiverId,
                    content,
                    conversationId,
                };

                console.log("📤 Sending message:", messageRequest);

                clientRef.current.publish({
                    destination: "/app/chat.send",
                    body: JSON.stringify(messageRequest),
                });
            },

            sendTypingIndicator: (receiverId: string, isTyping: boolean) => {
                if (!clientRef.current || !isConnectedRef.current) {
                    return;
                }

                const typingMessage = {
                    type: "TYPING",
                    userId: receiverId,
                    isTyping,
                    timestamp: Date.now(),
                };

                clientRef.current.publish({
                    destination: "/app/chat.typing",
                    body: JSON.stringify(typingMessage),
                });
            },

            isConnected: () => isConnectedRef.current,
        }));

        useEffect(() => {
            const userId = auth.getUser()?.id;
            if (!userId) return;

            // WebSocket connects directly to message-service (not through API Gateway)
            const WS_URL = process.env.NEXT_PUBLIC_WS_URL || "http://localhost:8083";

            // Create STOMP client
            // ✅ FIX: Create SockJS INSIDE webSocketFactory so each connection
            // attempt gets a fresh socket. Previously SockJS was created outside,
            // meaning React Strict Mode's unmount/remount cycle would kill the
            // socket but the factory would still return the dead one.
            const stompClient = new Client({
                webSocketFactory: () => new SockJS(`${WS_URL}/ws`),
                reconnectDelay: 5000,
                debug: (str) => console.log("STOMP_DEBUG:", str),
                connectHeaders: {
                    Authorization: `Bearer ${auth.getToken()}`,
                },
                onConnect: () => {
                    console.log("✅ WebSocket connected for user:", userId);
                    isConnectedRef.current = true;
                    onConnectRef.current?.();

                    // ✅ Subscribe to user's message topic
                    // Using /topic/chat/{userId} instead of /user/{userId}/queue/messages
                    // because Spring's convertAndSendToUser silently fails when it can't
                    // resolve the user session. Direct topic subscription is more reliable.
                    stompClient.subscribe(`/topic/chat/${userId}`, (message) => {
                        try {
                            const body = JSON.parse(message.body);
                            console.log("📩 Received WebSocket message:", body);
                            onMessageRef.current(body);
                        } catch (e) {
                            console.error("Failed to parse WebSocket message:", e);
                        }
                    });

                    // Subscribe to typing indicators
                    stompClient.subscribe(`/topic/typing/${userId}`, (message) => {
                        try {
                            const body = JSON.parse(message.body);
                            console.log("⌨️ Typing indicator:", body);
                            onTypingRef.current?.(body);
                        } catch (e) {
                            console.error("Failed to parse typing indicator:", e);
                        }
                    });
                },
                onStompError: (frame) => {
                    console.error("STOMP error:", frame);
                    isConnectedRef.current = false;
                },
                onDisconnect: () => {
                    console.log("❌ WebSocket disconnected");
                    isConnectedRef.current = false;
                },
                onWebSocketError: (event) => {
                    console.error("WebSocket error:", event);
                    isConnectedRef.current = false;
                },
            });

            stompClient.activate();
            clientRef.current = stompClient;

            return () => {
                console.log("🧹 Cleaning up WebSocket connection");
                isConnectedRef.current = false;
                stompClient.deactivate();
                clientRef.current = null;
            };
        }, []); // Empty deps - connect once on mount, refs ensure latest callbacks are used

        return null; // This is a headless component
    }
);

ChatSocket.displayName = "ChatSocket";

export default ChatSocket;
