// lib/auth.ts
import Cookies from "js-cookie";
import { LoginResponse, User } from "./types";

export const auth = {
    // Save user session after login
    setSession: (data: LoginResponse) => {
        Cookies.set("token", data.token, {
            expires: 7, // 7 days
            sameSite: "lax", // CSRF protection
        });
        Cookies.set("userId", data.userId, { expires: 7, sameSite: "lax" });
        Cookies.set("username", data.username, { expires: 7, sameSite: "lax" });
    },

    // Clear session on logout
    clearSession: () => {
        Cookies.remove("token");
        Cookies.remove("userId");
        Cookies.remove("username");
    },

    // Get current user info from cookies
    getUser: (): Partial<User> | null => {
        const userId = Cookies.get("userId");
        const username = Cookies.get("username");

        if (!userId || !username) return null;

        return { id: userId, username };
    },

    // Check if user is authenticated
    isAuthenticated: (): boolean => {
        return !!Cookies.get("token");
    },

    // Get token
    getToken: (): string | undefined => {
        return Cookies.get("token");
    },
};
