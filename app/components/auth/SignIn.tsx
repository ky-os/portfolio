"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { Github } from "lucide-react";
import { Card } from "../ui/Card";

export function SignIn() {
  const { signIn } = useAuthActions();
  return (
    <Card className="flex flex-col items-center gap-6 p-8 w-full max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-white">Admin Access</h1>
      <button
        onClick={() => signIn("github")}
        className="flex items-center gap-3 px-6 py-3 bg-gray-950 hover:bg-black text-white rounded-lg border border-gray-800 transition-colors w-full justify-center font-medium"
      >
        <Github size={20} />
        Sign in with GitHub
      </button>
    </Card>
  );
}

