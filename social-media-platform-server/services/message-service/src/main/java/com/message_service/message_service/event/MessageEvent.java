package com.message_service.message_service.event;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MessageEvent {
    private String type; // "NEW_MESSAGE"
    private String conversationId;
    private String senderId;
    private String senderName;
    private String receiverId;
    private String content;
}
