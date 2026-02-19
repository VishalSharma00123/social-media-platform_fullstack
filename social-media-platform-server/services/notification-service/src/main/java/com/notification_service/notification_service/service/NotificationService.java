package com.notification_service.notification_service.service;

// NotificationService.java
import com.notification_service.notification_service.client.UserServiceClient;
import com.notification_service.notification_service.dto.*;
import com.notification_service.notification_service.model.Notification;
import com.notification_service.notification_service.model.NotificationSettings;
import com.notification_service.notification_service.repository.NotificationRepository;
import com.notification_service.notification_service.repository.NotificationSettingsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final NotificationSettingsRepository settingsRepository;
    private final UserServiceClient userServiceClient;
    private final EmailService emailService;
    private final PushNotificationService pushNotificationService;
    private final SimpMessagingTemplate messagingTemplate;

    public NotificationResponse createNotification(NotificationRequest request) {
        // Get user settings
        NotificationSettings settings = getOrCreateSettings(request.getUserId());

        // Get sender info if senderId is provided
        UserDTO sender = null;
        if (request.getSenderId() != null) {
            sender = userServiceClient.getUserById(request.getSenderId());
        }

        // Create notification
        Notification notification = new Notification();
        notification.setUserId(request.getUserId());
        notification.setSenderId(request.getSenderId());
        if (sender != null) {
            notification.setSenderName(sender.getUsername());
            notification.setSenderProfilePicture(sender.getProfilePicture());
        }
        notification.setType(Notification.NotificationType.valueOf(request.getType()));
        notification.setTitle(request.getTitle());
        notification.setMessage(request.getMessage());
        notification.setTargetId(request.getTargetId());
        notification.setMetadata(request.getMetadata());
        notification.setCreatedAt(LocalDateTime.now());

        Notification saved = notificationRepository.save(notification);

        // Send notifications based on settings
        if (shouldSendInApp(settings, notification.getType())) {
            sendInAppNotification(saved);
        }

        if (shouldSendPush(settings, notification.getType()) && settings.getFcmToken() != null) {
            pushNotificationService.sendPushNotification(saved, settings.getFcmToken());
            saved.setPushSent(true);
        }

        // if (shouldSendEmail(settings, notification.getType())) {
        // try {
        // UserDTO user = userServiceClient.getUserById(request.getUserId());
        // if (user != null && user.getEmail() != null) {
        // emailService.sendNotificationEmail(saved, user.getEmail());
        // saved.setEmailSent(true);
        // } else {
        // log.warn("Cannot send email: User {} email not found", request.getUserId());
        // }
        // } catch (Exception e) {
        // log.error("Failed to fetch user email for notification: {}", e.getMessage());
        // }
        // }

        notificationRepository.save(saved);

        return mapToResponse(saved);
    }

    public NotificationResponse createRegistrationNotification(RegistrationNotificationRequest request) {
        // Get user settings
        NotificationSettings settings = getOrCreateSettings(request.getUserId());

        // Create notification
        Notification notification = new Notification();
        notification.setUserId(request.getUserId());
        notification.setType(Notification.NotificationType.valueOf(request.getType()));
        notification.setTitle(request.getTitle());
        notification.setMessage(request.getMessage());
        notification.setMetadata(request.getMetadata());
        notification.setCreatedAt(LocalDateTime.now());

        Notification saved = notificationRepository.save(notification);

        // Send notifications based on settings
        if (shouldSendInApp(settings, notification.getType())) {
            sendInAppNotification(saved);
        }

        if (shouldSendPush(settings, notification.getType()) && settings.getFcmToken() != null) {
            pushNotificationService.sendPushNotification(saved, settings.getFcmToken());
            saved.setPushSent(true);
        }

        if (shouldSendEmail(settings, notification.getType())) {
            try {
                UserDTO user = userServiceClient.getUserById(request.getUserId());
                if (user != null && user.getEmail() != null) {
                    emailService.sendNotificationEmail(saved, user.getEmail());
                    saved.setEmailSent(true);
                } else {
                    log.warn("Cannot send email: User {} email not found", request.getUserId());
                }
            } catch (Exception e) {
                log.error("Failed to fetch user email for registration notification: {}", e.getMessage());
            }
        }

        notificationRepository.save(saved);

        return mapToResponse(saved);
    }

    public NotificationResponse createLoginNotification(LoginNotificationRequest request) {
        // Get user settings
        NotificationSettings settings = getOrCreateSettings(request.getUserId());

        // Create notification
        Notification notification = new Notification();
        notification.setUserId(request.getUserId());
        notification.setType(Notification.NotificationType.valueOf(request.getType()));
        notification.setTitle(request.getTitle());
        notification.setMessage(request.getMessage());
        notification.setMetadata(request.getMetadata());
        notification.setCreatedAt(LocalDateTime.now());

        Notification saved = notificationRepository.save(notification);

        // Send notifications based on settings
        if (shouldSendInApp(settings, notification.getType())) {
            sendInAppNotification(saved);
        }

        if (shouldSendPush(settings, notification.getType()) && settings.getFcmToken() != null) {
            pushNotificationService.sendPushNotification(saved, settings.getFcmToken());
            saved.setPushSent(true);
        }

        if (shouldSendEmail(settings, notification.getType())) {
            try {
                UserDTO user = userServiceClient.getUserById(request.getUserId());
                if (user != null && user.getEmail() != null) {
                    emailService.sendNotificationEmail(saved, user.getEmail());
                    saved.setEmailSent(true);
                } else {
                    log.warn("Cannot send email: User {} email not found", request.getUserId());
                }
            } catch (Exception e) {
                log.error("Failed to fetch user email for login notification: {}", e.getMessage());
            }
        }

        notificationRepository.save(saved);

        return mapToResponse(saved);
    }

    public Page<NotificationResponse> getUserNotifications(String userId, boolean unreadOnly, Pageable pageable) {
        Page<Notification> notifications;

        if (unreadOnly) {
            notifications = notificationRepository.findByUserIdAndIsReadFalseOrderByCreatedAtDesc(userId, pageable);
        } else {
            notifications = notificationRepository.findByUserIdOrderByCreatedAtDesc(userId, pageable);
        }

        return notifications.map(this::mapToResponse);
    }

    public void markAsRead(String notificationId, String userId) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new RuntimeException("Notification not found"));

        if (!notification.getUserId().equals(userId)) {
            throw new RuntimeException("Unauthorized to mark this notification");
        }

        notification.setRead(true);
        notification.setReadAt(LocalDateTime.now());
        notificationRepository.save(notification);
    }

    public void markAllAsRead(String userId) {
        List<Notification> unreadNotifications = notificationRepository.findByUserIdAndIsReadFalse(userId);

        unreadNotifications.forEach(notification -> {
            notification.setRead(true);
            notification.setReadAt(LocalDateTime.now());
        });

        notificationRepository.saveAll(unreadNotifications);
    }

    public long getUnreadCount(String userId) {
        return notificationRepository.countByUserIdAndIsReadFalse(userId);
    }

    public void deleteNotification(String notificationId, String userId) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new RuntimeException("Notification not found"));

        if (!notification.getUserId().equals(userId)) {
            throw new RuntimeException("Unauthorized to delete this notification");
        }

        notificationRepository.delete(notification);
        log.info("🗑️ Deleted notification {} for user {}", notificationId, userId);
    }

    public void deleteAllNotifications(String userId) {
        List<Notification> allNotifications = notificationRepository
                .findByUserIdOrderByCreatedAtDesc(userId, Pageable.unpaged()).getContent();
        notificationRepository.deleteAll(allNotifications);
        log.info("🗑️ Deleted all {} notifications for user {}", allNotifications.size(), userId);
    }

    public NotificationSettings updateNotificationSettings(String userId, NotificationSettingsDTO dto) {
        NotificationSettings settings = getOrCreateSettings(userId); // ✅ SAFE

        // Update settings
        settings.setEmailOnFollow(dto.isEmailOnFollow());
        settings.setEmailOnComment(dto.isEmailOnComment());
        settings.setEmailOnLogin(dto.isPushOnLogin());
        settings.setEmailOnLike(dto.isEmailOnLike());
        settings.setEmailOnMention(dto.isEmailOnMention());
        settings.setEmailOnMessage(dto.isEmailOnMessage());

        settings.setPushOnFollow(dto.isPushOnFollow());
        settings.setPushOnComment(dto.isPushOnComment());
        settings.setPushOnLike(dto.isPushOnLike());
        settings.setPushOnMention(dto.isPushOnMention());
        settings.setPushOnMessage(dto.isPushOnMessage());

        settings.setInAppOnFollow(dto.isInAppOnFollow());
        settings.setInAppOnComment(dto.isInAppOnComment());
        settings.setInAppOnLike(dto.isInAppOnLike());
        settings.setInAppOnMention(dto.isInAppOnMention());
        settings.setInAppOnMessage(dto.isInAppOnMessage());

        if (dto.getFcmToken() != null) {
            settings.setFcmToken(dto.getFcmToken());
        }

        settings.setUpdatedAt(LocalDateTime.now());

        return settingsRepository.save(settings);
    }

    public NotificationSettings getNotificationSettings(String userId) {
        return getOrCreateSettings(userId);
    }

    private NotificationSettings createDefaultSettings(String userId) {
        log.info("📝 Creating default settings for user: {}", userId);
        NotificationSettings settings = new NotificationSettings();
        settings.setUserId(userId);
        settings.setCreatedAt(LocalDateTime.now());
        settings.setUpdatedAt(LocalDateTime.now());
        return settingsRepository.save(settings);
    }

    private NotificationSettings getOrCreateSettings(String userId) {
        return settingsRepository.findByUserId(userId)
                .orElseGet(() -> {
                    try {
                        return createDefaultSettings(userId);
                    } catch (org.springframework.dao.DuplicateKeyException e) {
                        // Race condition: settings created by another thread
                        log.warn("⚠️ Settings duplicate for user {}, fetching existing", userId);
                        return settingsRepository.findByUserId(userId)
                                .orElseThrow(() -> new RuntimeException("Failed to fetch settings after duplicate"));
                    }
                });
    }

    private void sendInAppNotification(Notification notification) {
        NotificationResponse response = mapToResponse(notification);
        messagingTemplate.convertAndSendToUser(
                notification.getUserId(),
                "/queue/notifications",
                response);
    }

    private boolean shouldSendEmail(NotificationSettings settings, Notification.NotificationType type) {
        switch (type) {
            case FOLLOW:
                return settings.isEmailOnFollow();
            case LOGIN:
                return settings.isEmailOnLogin();
            case REGISTRATION:
                return settings.isEmailOnRegistration();
            case PROFILE_UPDATE:
                return settings.isEmailOnMention();
            case PICTURE_UPLOAD:
                return settings.isEmailOnMessage();
            case LIKE_POST:
                return settings.isInAppOnLike();
            case COMMENT:
                return settings.isInAppOnComment();
            case MESSAGE:
                return settings.isInAppOnMessage();
            default:
                return false;
        }
    }

    private boolean shouldSendPush(NotificationSettings settings, Notification.NotificationType type) {
        switch (type) {
            case FOLLOW:
                return settings.isPushOnFollow();
            case LOGIN:
                return settings.isInAppOnLogin();
            case REGISTRATION:
                return settings.isPushOnRegistration();
            case PROFILE_UPDATE:
                return settings.isPushOnMention();
            case PICTURE_UPLOAD:
                return settings.isPushOnMessage();
            case LIKE_POST:
                return settings.isInAppOnLike();
            case COMMENT:
                return settings.isInAppOnComment();
            case MESSAGE:
                return settings.isInAppOnMessage();
            default:
                return true;
        }
    }

    private boolean shouldSendInApp(NotificationSettings settings, Notification.NotificationType type) {
        switch (type) {
            case FOLLOW:
                return settings.isInAppOnFollow();
            case LOGIN:
                return settings.isInAppOnLogin();
            case REGISTRATION:
                return settings.isInAppOnRegistration();
            case PROFILE_UPDATE:
                return settings.isInAppOnMention();
            case PICTURE_UPLOAD:
                return settings.isInAppOnMessage();
            case LIKE_POST:
                return settings.isInAppOnLike();
            case COMMENT:
                return settings.isInAppOnComment();
            case MESSAGE:
                return settings.isInAppOnMessage();
            default:
                return true;
        }
    }

    private NotificationResponse mapToResponse(Notification notification) {
        return NotificationResponse.builder()
                .id(notification.getId())
                .userId(notification.getUserId())
                .senderId(notification.getSenderId())
                .senderName(notification.getSenderName())
                .senderProfilePicture(notification.getSenderProfilePicture())
                .type(notification.getType().toString())
                .title(notification.getTitle())
                .message(notification.getMessage())
                .targetId(notification.getTargetId())
                .metadata(notification.getMetadata())
                .isRead(notification.isRead())
                .createdAt(notification.getCreatedAt())
                .readAt(notification.getReadAt())
                .build();
    }
}
