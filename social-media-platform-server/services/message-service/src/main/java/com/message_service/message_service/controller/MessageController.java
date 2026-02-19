package com.message_service.message_service.controller;

// MessageController.java
import com.message_service.message_service.service.ConversationService;
import com.message_service.message_service.dto.MessageRequest;
import com.message_service.message_service.dto.MessageResponse;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import com.message_service.message_service.service.MessageService;

import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/messages")
@RequiredArgsConstructor
@Slf4j
public class MessageController {

    private final MessageService messageService;

    private static final String UPLOAD_DIR = "uploads/messages/";

    // ✅ Add constructor to create directory
    @PostConstruct
    public void init() {
        try {
            Files.createDirectories(Paths.get(UPLOAD_DIR));
            log.info("✅ Upload directory created: {}", UPLOAD_DIR);
        } catch (IOException e) {
            log.error("❌ Failed to create upload directory: {}", e.getMessage());
        }
    }

    @PostMapping("/send")
    public ResponseEntity<MessageResponse> sendMessage(
            @AuthenticationPrincipal String senderId,
            @Valid @RequestBody MessageRequest request) {
        log.info("📩 MessageController: sendMessage called. SenderId from Token: {}", senderId);
        log.info("   Target ReceiverId: {}", request.getReceiverId());
        MessageResponse response = messageService.sendMessage(senderId, request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/media/{filename}")
    public ResponseEntity<Resource> getImage(@PathVariable String filename) {

        log.info("📷 Media request: {}", filename);

        // Serve the file directly - endpoint is public, filenames are UUIDs
        // (unguessable)
        Path filePath = Paths.get(UPLOAD_DIR + filename);
        Resource resource = new FileSystemResource(filePath);

        if (!resource.exists()) {
            log.warn("❌ File not found on disk: {}", filePath);
            return ResponseEntity.notFound().build();
        }

        log.info("✅ Serving media file: {}", filename);

        String contentType = getContentType(filename);
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .body(resource);
    }

    private String getContentType(String filename) {
        String lower = filename.toLowerCase();
        if (lower.endsWith(".png"))
            return "image/png";
        if (lower.endsWith(".gif"))
            return "image/gif";
        if (lower.endsWith(".webp"))
            return "image/webp";
        if (lower.endsWith(".mp4"))
            return "video/mp4";
        if (lower.endsWith(".webm"))
            return "video/webm";
        if (lower.endsWith(".mov"))
            return "video/quicktime";
        return "image/jpeg"; // default
    }

    @PostMapping("/send-with-media")
    public ResponseEntity<MessageResponse> sendMessageWithMedia(
            @AuthenticationPrincipal String senderId,
            @RequestParam("receiverId") String receiverId,
            @RequestParam("content") String content,
            @RequestParam("type") String type,
            @RequestParam(value = "file", required = false) MultipartFile file) {

        log.info("📤 Received media upload request from user: {}", senderId);
        log.info("   Receiver: {}", receiverId);
        log.info("   Type: {}", type);
        log.info("   File: {}", file != null ? file.getOriginalFilename() : "none");

        String mediaUrl = null;

        if (file != null && !file.isEmpty()) {
            try {
                // Create directory if doesn't exist
                File uploadDir = new File(UPLOAD_DIR);
                if (!uploadDir.exists()) {
                    uploadDir.mkdirs();
                    log.info("📁 Created upload directory: {}", UPLOAD_DIR);
                }

                // Validate file
                if (file.getSize() > 10 * 1024 * 1024) { // 10MB
                    log.error("❌ File too large: {} bytes", file.getSize());
                    return ResponseEntity.badRequest().build();
                }

                // Generate filename
                String originalFilename = file.getOriginalFilename();
                String extension = "";
                if (originalFilename != null && originalFilename.contains(".")) {
                    extension = originalFilename.substring(originalFilename.lastIndexOf("."));
                }
                String filename = UUID.randomUUID().toString() + extension;

                // Save file
                Path filePath = Paths.get(UPLOAD_DIR + filename);
                Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

                mediaUrl = "/api/messages/media/" + filename;

                log.info("✅ File uploaded successfully: {}", filename);
                log.info("   Size: {} bytes", file.getSize());
                log.info("   URL: {}", mediaUrl);

            } catch (IOException e) {
                log.error("❌ File upload failed: {}", e.getMessage(), e);
                return ResponseEntity.internalServerError().build();
            }
        }

        // Create message request
        MessageRequest request = new MessageRequest();
        request.setReceiverId(receiverId);
        request.setContent(content);
        request.setType(type);
        request.setMediaUrl(mediaUrl);

        MessageResponse response = messageService.sendMessage(senderId, request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/conversation/{conversationId}")
    public ResponseEntity<Page<MessageResponse>> getConversationMessages(
            @PathVariable String conversationId,
            @AuthenticationPrincipal String userId,
            Pageable pageable) {
        Page<MessageResponse> messages = messageService.getConversationMessages(conversationId, userId, pageable);
        return ResponseEntity.ok(messages);
    }

    @DeleteMapping("/{messageId}")
    public ResponseEntity<Void> deleteMessage(
            @PathVariable String messageId,
            @AuthenticationPrincipal String userId) {
        messageService.deleteMessage(messageId, userId);
        return ResponseEntity.noContent().build();
    }
}
