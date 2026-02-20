// lib/config.ts — Centralized URL config for all services
// These use environment variables for deployment, falling back to localhost for local dev

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
const USER_SERVICE_URL = process.env.NEXT_PUBLIC_USER_SERVICE_URL || "http://localhost:8081";
const POST_SERVICE_URL = process.env.NEXT_PUBLIC_POST_SERVICE_URL || "http://localhost:8082";
const WS_URL = process.env.NEXT_PUBLIC_WS_URL || "http://localhost:8083";

export const config = {
    apiUrl: API_URL,
    userServiceUrl: USER_SERVICE_URL,
    postServiceUrl: POST_SERVICE_URL,
    wsUrl: WS_URL,
};

/**
 * Build full URL for media files (images, videos, profile pictures).
 * Handles both absolute URLs (http://...) and relative paths (/uploads/...).
 */
export const getMediaUrl = (path: string | undefined | null): string => {
    if (!path) return "";
    if (path.startsWith("http")) return path;

    // Profile pictures → User Service
    if (path.includes("profile-pictures")) {
        return `${config.userServiceUrl}${path}`;
    }

    // Post images/videos → Post Service
    if (path.includes("uploads")) {
        return `${config.postServiceUrl}${path}`;
    }

    // Default to user service for avatars
    return `${config.userServiceUrl}${path}`;
};

/**
 * Build full URL for message media files.
 */
export const getMessageMediaUrl = (path: string | undefined | null): string => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    return `${config.apiUrl}${path}`;
};
