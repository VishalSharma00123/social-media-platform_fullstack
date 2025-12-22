// components/ChatSocket.tsx

"use client";
import { useEffect, useRef, useImperativeHandle, forwardRef } from "react";
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

            // Create WebSocket connection via SockJS
            const socket = new SockJS("http://localhost:8080/ws");

            // Create STOMP client
            const stompClient = new Client({
                webSocketFactory: () => socket as any,
                reconnectDelay: 5000,
                debug: (str) => console.log("STOMP:", str),
                onConnect: () => {
                    console.log("✅ WebSocket connected");
                    isConnectedRef.current = true;
                    onConnect?.();

                    // Subscribe to user's message queue
                    stompClient.subscribe(`/user/${userId}/queue/messages`, (message) => {
                        const body = JSON.parse(message.body);
                        console.log("📩 Received message:", body);
                        onMessage(body);
                    });

                    // Subscribe to typing indicators
                    stompClient.subscribe(`/user/${userId}/queue/typing`, (message) => {
                        const body = JSON.parse(message.body);
                        console.log("⌨️ Typing indicator:", body);
                        onTyping?.(body);
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
            });

            stompClient.activate();
            clientRef.current = stompClient;

            return () => {
                isConnectedRef.current = false;
                stompClient.deactivate();
            };
        }, [onMessage, onTyping, onConnect]);

        return null; // This is a headless component
    }
);

ChatSocket.displayName = "ChatSocket";

export default ChatSocket;
