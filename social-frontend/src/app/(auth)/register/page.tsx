// app/(auth)/register/page.tsx
"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "@/lib/api";
import { auth } from "@/lib/auth";
import { LoginResponse } from "@/lib/types";

export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        fullName: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            // Call your /api/users/register endpoint
            const response = await api.post<LoginResponse>("/api/users/register", formData);

            // Save session (assuming backend returns token + user)
            auth.setSession(response.data);

            // Redirect to feed
            router.push("/feed");
        } catch (err: any) {
            setError(err.response?.data?.message || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card p-8 sm:p-10 shadow-xl border-surface-100 bg-white/95 backdrop-blur-sm">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-surface-900 tracking-tight">Create Account</h1>
                <p className="text-surface-500 mt-2">Join our community and start sharing</p>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm flex items-center">
                    <span className="mr-2">⚠️</span>
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <label className="block text-sm font-semibold text-surface-700 mb-1.5 ml-1">
                            Username
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="johndoe"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            className="input-field"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-surface-700 mb-1.5 ml-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="John Doe"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            className="input-field"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-surface-700 mb-1.5 ml-1">
                        Email Address
                    </label>
                    <input
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                        minLength={6}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="input-field"
                    />
                    <p className="mt-1.5 ml-1 text-xs text-surface-400">Must be at least 6 characters long</p>
                </div>

                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full btn-primary py-3 rounded-xl text-lg font-semibold"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center">
                                <span className="animate-spin mr-2">◌</span> Creating account...
                            </span>
                        ) : "Create Account"}
                    </button>
                </div>
            </form>

            <div className="mt-8 pt-6 border-t border-surface-100 text-center">
                <p className="text-surface-600 text-sm">
                    Already have an account?{" "}
                    <Link href="/login" className="text-primary-600 hover:text-primary-700 font-bold ml-1">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
}

