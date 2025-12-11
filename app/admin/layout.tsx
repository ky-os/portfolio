"use client";

import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { SignIn } from "@/app/components/auth/SignIn";
import { LogOut } from "lucide-react";

function AdminHeader() {
    const { signOut } = useAuthActions();
    return (
        <header className="border-b border-gray-800 p-4 flex justify-between items-center bg-gray-900/50 backdrop-blur-sm sticky top-0 z-10">
            <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
            <button 
                onClick={() => signOut()}
                className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded-md transition-colors"
            >
                <LogOut size={16} />
                Sign Out
            </button>
        </header>
    );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <AuthLoading>
                <div className="flex h-screen items-center justify-center bg-gray-900 text-white">
                    <div className="animate-pulse">Loading...</div>
                </div>
            </AuthLoading>
            <Unauthenticated>
                <div className="flex h-screen items-center justify-center bg-gray-900 text-white">
                    <SignIn />
                </div>
            </Unauthenticated>
            <Authenticated>
                <div className="min-h-screen bg-gray-900 text-white">
                    <AdminHeader />
                    <main className="p-6 max-w-7xl mx-auto">
                        {children}
                    </main>
                </div>
            </Authenticated>
        </>
    );
}

