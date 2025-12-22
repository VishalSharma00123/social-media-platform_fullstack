// lib/types.ts
export interface User {
    id: string;
    username: string;
    email: string;
    fullName?: string;
    bio?: string;
    profilePicture?: string;
    followersCount: number;
    followingCount: number;
    isFollowing?: boolean;
}

export interface LoginResponse {
    token: string;
    userId: string;
    username: string;
    email: string;
    profilePicture?: string;
}

export interface Post {
    id: string;
    userId: string;
    username: string;
    userProfilePicture?: string;
    content: string;
    postType: "TEXT" | "IMAGE" | "VIDEO";
    images: string[];
    videoUrl?: string;
    likesCount: number;
    commentsCount: number;
    sharesCount: number;
    isLiked: boolean;
    recentComments?: Comment[];
    createdAt: string;
}

export interface Comment {
    id: string;
    userId: string;
    username: string;
    content: string;
    createdAt: string;
}

export interface Notification {
    id: string;
    userId: string;
    senderId?: string;
    senderName?: string;
    type: string;
    title: string;
    message: string;
    targetId?: string;
    read: boolean;
    createdAt: string;
}

export interface Conversation {
    id: string;
    participants: string[];
    participantDetails: User[];
    otherUserId: string;
    otherUserName: string;
    otherUserProfilePicture?: string;
    lastMessage?: string;
    lastMessageTime?: string;
    unreadCount: number;
    updatedAt: string;
}


export interface Message {
    id: string;
    conversationId: string;
    senderId: string;
    receiverId: string;
    content: string;
    type: "TEXT" | "IMAGE" | "VIDEO" | "FILE";
    mediaUrl?: string;
    read: boolean;
    deleted: boolean;
    createdAt: string;
}

export interface PageResponse<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
}
