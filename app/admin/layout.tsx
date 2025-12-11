"use client";

import { Authenticated, Unauthenticated, AuthLoading, useQuery } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { SignIn } from "@/app/components/auth/SignIn";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function AdminHeader() {
    const { signOut } = useAuthActions();
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-md border-b border-gray-800">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link href="/admin" className="text-xl font-bold text-white tracking-tight hover:text-blue-400 transition-colors" prefetch={false}>
                    Admin<span className="text-blue-500">.</span>
                </Link>
                <button
                    onClick={() => signOut()}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-md transition-colors"
                >
                    <LogOut size={16} />
                    Sign Out
                </button>
            </div>
        </header>
    );
}

function SecurityCheck({ children }: { children: React.ReactNode }) {
    const isAdmin = useQuery(api.queries.isAdmin);
    const router = useRouter();

    useEffect(() => {
        if (isAdmin === false) {
            router.push("/intruder");
        }
    }, [isAdmin, router]);

    if (isAdmin === undefined) {
        return (
            <div className="flex h-screen items-center justify-center bg-black text-white flex-col gap-4">
                <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <div className="font-mono text-blue-400 text-sm">VERIFYING CLEARANCE...</div>
            </div>
        );
    }

    if (isAdmin === false) {
        return null;
    }

    return <>{children}</>;
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <AuthLoading>
                <div className="flex h-screen items-center justify-center bg-gray-950 text-white">
                    <div className="animate-pulse text-blue-500 font-mono">Loading...</div>
                </div>
            </AuthLoading>
            <Unauthenticated>
                <div className="flex h-screen items-center justify-center bg-gray-950 text-white">
                    <SignIn />
                </div>
            </Unauthenticated>
            <Authenticated>
                <SecurityCheck>
                    <div className="min-h-screen bg-gray-950 text-white pt-20">
                        <AdminHeader />
                        <main className="p-6 max-w-7xl mx-auto">
                            {children}
                        </main>
                    </div>
                </SecurityCheck>
            </Authenticated>
        </>
    );
}

