package com.message_service.message_service.service;

import com.message_service.message_service.client.UserServiceClient;
import com.message_service.message_service.dto.MessageRequest;
import com.message_service.message_service.dto.MessageResponse;
import com.message_service.message_service.dto.UserDTO;
import com.message_service.message_service.dto.WebSocketMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import com.message_service.message_service.model.Conversation;
import com.message_service.message_service.model.Message;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Service;
import com.message_service.message_service.repository.ConversationRepository;
import com.message_service.message_service.repository.MessageRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class MessageService {

    private final MessageRepository messageRepository;
    private final ConversationService conversationService; // ✅ Inject ConversationService
    private final UserServiceClient userServiceClient;
    private final SimpMessagingTemplate messagingTemplate;

    public MessageResponse sendMessage(String senderId, MessageRequest request) {
        log.info("Sending message from {} to {}", senderId, request.getReceiverId());

        // Get sender details
        UserDTO sender = userServiceClient.getUserById(senderId);

        // ✅ REUSE ConversationService
        Conversation conversation = conversationService.findOrCreateConversation(senderId, request.getReceiverId());

        // Create and save message
        Message message = new Message();
        message.setConversationId(conversation.getId());
        message.setSenderId(senderId);
        message.setSenderName(sender.getUsername());
        message.setSenderProfilePicture(sender.getProfilePicture());
        message.setReceiverId(request.getReceiverId());
        message.setContent(request.getContent());
        message.setType(Message.MessageType.valueOf(request.getType()));
        message.setMediaUrl(request.getMediaUrl());
        message.setCreatedAt(LocalDateTime.now());
        message.setRead(false);

        Message savedMessage = messageRepository.save(message);
        log.info("Message saved with ID: {}", savedMessage.getId());

        // ✅ REUSE ConversationService to update conversation
        conversationService.updateAfterMessage(conversation, savedMessage, request.getReceiverId());

        // Send WebSocket notification
        MessageResponse response = mapToResponse(savedMessage);
        WebSocketMessage wsMessage = WebSocketMessage.builder()
                .type("MESSAGE")
                .conversationId(conversation.getId())
                .message(response)
                .userId(senderId)
                .timestamp(System.currentTimeMillis())
                .build();

        try {
            // Send to receiver
            messagingTemplate.convertAndSendToUser(
                    request.getReceiverId(),
                    "/queue/messages",
                    wsMessage);

            // Send to sender (to sync across multiple tabs/devices)
            messagingTemplate.convertAndSendToUser(
                    senderId,
                    "/queue/messages",
                    wsMessage);
        } catch (Exception e) {
            log.error("Failed to send WebSocket notification: {}", e.getMessage());
        }

        return response;
    }

    public Page<MessageResponse> getConversationMessages(String conversationId, String userId, Pageable pageable) {
        log.info("Getting messages for conversation: {}", conversationId);

        Page<Message> messages = messageRepository.findByConversationIdOrderByCreatedAtDesc(conversationId, pageable);

        // ✅ REUSE ConversationService to mark as read
        conversationService.markAsRead(conversationId, userId);

        return messages.map(this::mapToResponse);
    }

    public void deleteMessage(String messageId, String userId) {
        log.info("Deleting message: {} by user: {}", messageId, userId);
        Message message = messageRepository.findById(messageId)
                .orElseThrow(() -> new RuntimeException("Message not found"));

        // Only sender can delete for everyone (standard behavior)
        if (!message.getSenderId().equals(userId)) {
            throw new RuntimeException("Unauthorized to delete this message");
        }

        message.setDeleted(true);
        message.setContent("This message was deleted");
        message.setMediaUrl(null); // Clear media if any
        messageRepository.save(message);

        // Notify both parties via WebSocket
        MessageResponse response = mapToResponse(message);
        WebSocketMessage wsMessage = WebSocketMessage.builder()
                .type("DELETE")
                .conversationId(message.getConversationId())
                .message(response)
                .messageId(messageId)
                .userId(userId)
                .timestamp(System.currentTimeMillis())
                .build();

        try {
            // Send to receiver
            messagingTemplate.convertAndSendToUser(
                    message.getReceiverId(),
                    "/queue/messages",
                    wsMessage);
            // Send back to sender (in case they have multiple sessions/tabs)
            messagingTemplate.convertAndSendToUser(
                    message.getSenderId(),
                    "/queue/messages",
                    wsMessage);
        } catch (Exception e) {
            log.error("Failed to send WebSocket delete notification: {}", e.getMessage());
        }
    }

    private MessageResponse mapToResponse(Message message) {
        return MessageResponse.builder()
                .id(message.getId())
                .conversationId(message.getConversationId())
                .senderId(message.getSenderId())
                .senderName(message.getSenderName())
                .senderProfilePicture(message.getSenderProfilePicture())
                .receiverId(message.getReceiverId())
                .content(message.getContent())
                .type(message.getType().toString())
                .mediaUrl(message.getMediaUrl())
                .isRead(message.isRead())
                .isDeleted(message.isDeleted())
                .createdAt(message.getCreatedAt())
                .readAt(message.getReadAt())
                .build();
    }
}
