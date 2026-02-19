package com.message_service.message_service.controller;

import com.message_service.message_service.dto.MessageRequest;
import com.message_service.message_service.dto.WebSocketMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import com.message_service.message_service.service.MessageService;

@Controller
@RequiredArgsConstructor
@Slf4j
public class WebSocketController {

        private final MessageService messageService;
        private final SimpMessagingTemplate messagingTemplate;

        @MessageMapping("/chat.send")
        public void sendMessage(@Payload MessageRequest messageRequest,
                        SimpMessageHeaderAccessor headerAccessor) {
                try {
                        // Extract userId from session
                        Object userIdObj = headerAccessor.getSessionAttributes() != null
                                        ? headerAccessor.getSessionAttributes().get("userId")
                                        : null;

                        if (userIdObj == null) {
                                log.error("❌ No userId in WebSocket session! Authentication required.");
                                return;
                        }

                        String userId = userIdObj.toString();
                        log.info("📤 WebSocket: Sending message from userId: {} to receiverId: {}", userId,
                                        messageRequest.getReceiverId());

                        // Save message to database AND send WebSocket notifications
                        // MessageService.sendMessage() already handles sending to both
                        // receiver and sender via /topic/chat/{userId}
                        messageService.sendMessage(userId, messageRequest);

                        log.info("✅ WebSocket: Message processed successfully");

                } catch (Exception e) {
                        log.error("❌ Error sending message: {}", e.getMessage(), e);
                }
        }

        @MessageMapping("/chat.typing")
        public void typing(@Payload WebSocketMessage message,
                        SimpMessageHeaderAccessor headerAccessor) {
                try {
                        // Extract userId from session
                        Object userIdObj = headerAccessor.getSessionAttributes() != null
                                        ? headerAccessor.getSessionAttributes().get("userId")
                                        : null;

                        if (userIdObj == null) {
                                log.error("❌ No userId in WebSocket session for typing indicator");
                                return;
                        }

                        String senderId = userIdObj.toString();

                        // The receiverId comes from the message payload
                        String receiverId = message.getUserId();

                        // Set the sender's info
                        message.setUserId(senderId);
                        message.setTimestamp(System.currentTimeMillis());

                        log.info("⌨️ Typing indicator from {} to {} - isTyping: {}", senderId, receiverId,
                                        message.isTyping());

                        // Send typing indicator to the receiver via topic
                        if (receiverId != null && !receiverId.equals(senderId)) {
                                messagingTemplate.convertAndSend(
                                                "/topic/typing/" + receiverId,
                                                message);
                        }

                } catch (Exception e) {
                        log.error("❌ Error handling typing indicator: {}", e.getMessage(), e);
                }
        }
}