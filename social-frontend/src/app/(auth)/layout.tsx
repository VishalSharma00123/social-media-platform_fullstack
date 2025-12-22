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
        <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-100 rounded-full blur-[100px] opacity-50" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-[100px] opacity-50" />

            <div className="max-w-md w-full px-6 py-12 relative z-10 animate-in">
                {children}
            </div>
        </div>
    );
}

