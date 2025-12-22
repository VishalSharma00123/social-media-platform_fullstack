package com.message_service.message_service.controller;

import com.message_service.message_service.dto.MessageRequest;
import com.message_service.message_service.dto.MessageResponse;
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
                        log.info("📤 Sending message from userId: {} to receiverId: {}", userId,
                                        messageRequest.getReceiverId());

                        // Save message to database
                        MessageResponse response = messageService.sendMessage(userId, messageRequest);

                        // Create WebSocket message wrapper
                        WebSocketMessage wsMessage = WebSocketMessage.builder()
                                        .type("MESSAGE")
                                        .message(response)
                                        .conversationId(response.getConversationId())
                                        .timestamp(System.currentTimeMillis())
                                        .build();

                        // Send to receiver
                        messagingTemplate.convertAndSendToUser(
                                        messageRequest.getReceiverId(),
                                        "/queue/messages",
                                        wsMessage);

                        log.info("✅ Message sent successfully to user: {}", messageRequest.getReceiverId());

                        // Also send confirmation back to sender
                        messagingTemplate.convertAndSendToUser(
                                        userId,
                                        "/queue/messages",
                                        wsMessage);

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

                        // Set the sender's userId
                        message.setUserId(senderId);
                        message.setTimestamp(System.currentTimeMillis());

                        // Get the receiver from the message (the person who should see the typing
                        // indicator)
                        String receiverId = message.getUserId(); // This should be the target user

                        log.info("⌨️ Typing indicator from {} - isTyping: {}", senderId, message.isTyping());

                        // Send typing indicator to the RECEIVER (not the sender!)
                        // The receiver should be extracted from the message payload
                        if (receiverId != null && !receiverId.equals(senderId)) {
                                messagingTemplate.convertAndSendToUser(
                                                receiverId,
                                                "/queue/typing",
                                                message);
                        }

                } catch (Exception e) {
                        log.error("❌ Error handling typing indicator: {}", e.getMessage(), e);
                }
        }
}