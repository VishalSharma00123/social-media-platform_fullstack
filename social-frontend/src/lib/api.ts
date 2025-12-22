// lib/api.ts
import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
    baseURL: "http://localhost:8080",
    timeout: 60000, // 60 seconds for file uploads
    // ❌ REMOVE this - it breaks multipart/form-data
    // headers: {
    //     "Content-Type": "application/json",
    // },
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        const token = Cookies.get("token");
        const userId = Cookies.get("userId");

        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }

        if (userId) {
            config.headers["X-User-Id"] = userId;
        }

        // ✅ Only set Content-Type for non-FormData requests
        if (!(config.data instanceof FormData)) {
            config.headers["Content-Type"] = "application/json";
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            Cookies.remove("token");
            Cookies.remove("userId");
            Cookies.remove("username");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default api;