// lib/config.ts — Centralized URL config for all services
// IMPORTANT: All requests go through the API Gateway (port 8080).
// Individual service ports (8081, 8082, 8083) are NOT exposed externally.
// The API Gateway proxies: /files/** → user-service, /uploads/** → post-service, /ws/** → message-service

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export const config = {
    apiUrl: API_URL,
    // WebSocket also goes through API Gateway
    wsUrl: process.env.NEXT_PUBLIC_WS_URL || API_URL,
};

/**
 * Build full URL for media files (images, videos, profile pictures).
 * All files are served through the API Gateway.
 * Handles both absolute URLs (http://...) and relative paths (/uploads/...).
 */
export const getMediaUrl = (path: string | undefined | null): string => {
    if (!path) return "";
    if (path.startsWith("http")) {
        // If it's already an absolute URL pointing to localhost, rewrite it to API Gateway
        // This handles cases where the backend stored full localhost URLs in the database
        const localhostPattern = /^http:\/\/localhost:\d+/;
        if (localhostPattern.test(path)) {
            return path.replace(localhostPattern, config.apiUrl);
        }
        return path;
    }
    // Relative path — prefix with API Gateway URL
    return `${config.apiUrl}${path}`;
};

/**
 * Build full URL for message media files (same as regular media, through API Gateway).
 */
export const getMessageMediaUrl = (path: string | undefined | null): string => {
    if (!path) return "";
    if (path.startsWith("http")) {
        const localhostPattern = /^http:\/\/localhost:\d+/;
        if (localhostPattern.test(path)) {
            return path.replace(localhostPattern, config.apiUrl);
        }
        return path;
    }
    return `${config.apiUrl}${path}`;
};
