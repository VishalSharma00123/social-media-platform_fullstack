// app/(auth)/layout.tsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../lib/auth";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();

    // Redirect to feed if already logged in
    useEffect(() => {
        if (auth.isAuthenticated()) {
            router.replace("/feed");
        }
    }, [router]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-surface-50 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary-100/40 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-accent-pink/10 rounded-full blur-[120px] animate-pulse delay-700" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-accent-cyan/5 rounded-full blur-[150px]" />

            <div className="max-w-md w-full px-6 py-12 relative z-10 animate-scale-in">
                <div className="flex justify-center mb-12">
                    <div className="w-16 h-16 bg-primary-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-primary-500/40 rotate-12">
                        <span className="text-white font-black text-3xl">S</span>
                    </div>
                </div>
                {children}
            </div>
        </div>
    );
}


