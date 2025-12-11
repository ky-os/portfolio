"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { Github } from "lucide-react";

export function SignIn() {
  const { signIn } = useAuthActions();
  return (
    <div className="flex flex-col items-center gap-6 p-8 bg-gray-800 rounded-xl border border-gray-700">
        <h1 className="text-2xl font-bold text-white">Admin Access</h1>
        <button 
            onClick={() => signIn("github")}
            className="flex items-center gap-3 px-6 py-3 bg-gray-900 hover:bg-gray-950 text-white rounded-lg border border-gray-700 transition-colors"
        >
            <Github size={20} />
            Sign in with GitHub
        </button>
    </div>
  );
}

