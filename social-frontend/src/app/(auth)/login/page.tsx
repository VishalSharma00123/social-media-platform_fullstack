// app/(auth)/login/page.tsx
"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "@/lib/api";
import { auth } from "@/lib/auth";
import { LoginResponse } from "@/lib/types";

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await api.post<LoginResponse>("/api/users/login", formData);
            auth.setSession(response.data);

            // Use replace instead of push to prevent back button issues
            // Add small delay to ensure cookies are set before navigation
            setTimeout(() => {
                router.replace("/feed");
            }, 100);
        } catch (err: any) {
            setError(err.response?.data?.message || "Invalid username or password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="glass-card p-10 sm:p-12 shadow-2xl">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-black text-surface-900 tracking-tight">Welcome Back</h1>
                <p className="text-surface-500 mt-3 font-medium">Continue your journey in the social universe</p>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-100 text-red-600 px-5 py-4 rounded-2xl mb-8 text-sm font-bold flex items-center animate-shake">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-3 flex-shrink-0"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-[11px] font-black text-surface-400 uppercase tracking-widest mb-2 ml-1">
                        Username
                    </label>
                    <input
                        type="text"
                        required
                        placeholder="yourname"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        className="input-field"
                    />
                </div>

                <div>
                    <label className="block text-[11px] font-black text-surface-400 uppercase tracking-widest mb-2 ml-1">
                        Password
                    </label>
                    <input
                        type="password"
                        required
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="input-field"
                    />
                </div>

                <div className="flex items-center justify-between text-xs px-1">
                    <label className="flex items-center text-surface-500 font-bold cursor-pointer group">
                        <input type="checkbox" className="rounded-lg border-surface-200 text-primary-600 mr-2.5 focus:ring-primary-500/20 transition-all w-5 h-5" />
                        <span className="group-hover:text-surface-700 transition-colors">Remember me</span>
                    </label>
                    <Link href="#" className="text-primary-600 hover:text-primary-700 font-black transition-colors">
                        Forgot Password?
                    </Link>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-primary py-4 text-sm uppercase tracking-widest font-black mt-4"
                >
                    {loading ? (
                        <span className="flex items-center justify-center space-x-3">
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                            <span>Signing In...</span>
                        </span>
                    ) : "Sign In"}
                </button>
            </form>

            <div className="mt-10 pt-8 border-t border-surface-100 text-center">
                <p className="text-surface-500 text-sm font-medium">
                    New to Social?{" "}
                    <Link href="/register" className="text-primary-600 hover:text-primary-700 font-black ml-1 transition-all hover:underline decoration-2 underline-offset-4">
                        Create Account
                    </Link>
                </p>
            </div>
        </div>
    );
}


