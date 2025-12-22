// app/page.tsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/auth";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const token = auth.getToken();

    if (token) {
      // User is logged in, redirect to feed
      router.push("/feed");
    } else {
      // User is not logged in, redirect to login
      router.push("/login");
    }
  }, [router]);

  // Show a loading state while redirecting
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    </div>
  );
}
