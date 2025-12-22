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
            router.push("/feed");
        } catch (err: any) {
            setError(err.response?.data?.message || "Invalid username or password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card p-8 sm:p-10 shadow-xl border-surface-100 bg-white/95 backdrop-blur-sm">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-surface-900 tracking-tight">Welcome Back</h1>
                <p className="text-surface-500 mt-2">Sign in to stay connected with your community</p>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm flex items-center">
                    <span className="mr-2">⚠️</span>
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-sm font-semibold text-surface-700 mb-1.5 ml-1">
                        Username
                    </label>
                    <input
                        type="text"
                        required
                        placeholder="Enter your username"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        className="input-field"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-surface-700 mb-1.5 ml-1">
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

                <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center text-surface-600 cursor-pointer">
                        <input type="checkbox" className="rounded border-surface-300 text-primary-600 mr-2 focus:ring-primary-500" />
                        Remember me
                    </label>
                    <Link href="#" className="text-primary-600 hover:text-primary-700 font-medium">
                        Forgot password?
                    </Link>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-primary py-3 rounded-xl text-lg font-semibold mt-2"
                >
                    {loading ? (
                        <span className="flex items-center justify-center">
                            <span className="animate-spin mr-2">◌</span> Signing in...
                        </span>
                    ) : "Sign In"}
                </button>
            </form>

            <div className="mt-8 pt-6 border-t border-surface-100 text-center">
                <p className="text-surface-600 text-sm">
                    Don't have an account?{" "}
                    <Link href="/register" className="text-primary-600 hover:text-primary-700 font-bold ml-1">
                        Create Account
                    </Link>
                </p>
            </div>
        </div>
    );
}

