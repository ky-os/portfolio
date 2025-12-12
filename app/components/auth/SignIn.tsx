"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { Lock, Fingerprint, Loader2, Terminal, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export function SignIn() {
  const { signIn } = useAuthActions();
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("INITIALIZING HANDSHAKE...");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSignIn = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    // Cycle through some "hacker" texts while waiting for the redirect
    const texts = [
      "RESOLVING HOST...",
      "BYPASSING PROXY...",
      "INJECTING PAYLOAD...",
      "AUTHENTICATING..."
    ];

    let i = 0;
    const interval = setInterval(() => {
      setLoadingText(texts[i % texts.length]);
      i++;
    }, 800);

    try {
      await signIn("github");
    } catch (err) {
      console.error("Convex Auth sign-in failed", err);
      setIsLoading(false);
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Sign-in failed. Check Convex/Next env + allowed origin settings.",
      );
    } finally {
      clearInterval(interval);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto perspective-1000">
      {/* Back Button */}
      <div className="w-full mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-300 transition-colors text-sm font-mono group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Portfolio
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative group w-full"
      >
        {/* Glitch/Cyberpunk Border Effect */}
        <div className="absolute -inset-0.5 bg-linear-to-r from-blue-500 to-purple-600 rounded-xl opacity-20 group-hover:opacity-100 transition duration-500 blur group-hover:blur-md"></div>

        <div className="relative bg-black border border-gray-800 p-8 rounded-xl shadow-2xl overflow-hidden min-h-80 flex flex-col justify-center">
          {/* Background Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>

          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative z-10 flex flex-col items-center gap-6 w-full"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full animate-pulse"></div>
                  <Loader2 className="w-16 h-16 text-blue-500 animate-spin relative z-10" />
                </div>

                <div className="w-full space-y-2">
                  <div className="flex items-center gap-2 text-blue-400 font-mono text-sm">
                    <Terminal size={14} />
                    <span className="animate-pulse">{loadingText}</span>
                  </div>
                  <div className="h-1 w-full bg-gray-900 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-blue-500"
                      initial={{ x: "-100%" }}
                      animate={{ x: "100%" }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    />
                  </div>
                  <div className="font-mono text-[10px] text-gray-600 h-20 overflow-hidden opacity-70">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="truncate">
                        {`> 0x${Math.random().toString(16).slice(2, 10).toUpperCase()}... [OK]`}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative z-10 flex flex-col items-center gap-6"
              >
                <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center border border-gray-700 group-hover:border-blue-500/50 transition-colors duration-500">
                  <motion.div
                    animate={{ rotate: isHovered ? 360 : 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {isHovered ? <Fingerprint className="w-8 h-8 text-blue-400" /> : <Lock className="w-8 h-8 text-gray-400" />}
                  </motion.div>
                </div>

                <div className="text-center space-y-2">
                  <h1 className="text-2xl font-bold text-white tracking-wider font-mono">
                    SYSTEM_OVERRIDE
                  </h1>
                  <p className="text-xs text-gray-500 font-mono uppercase tracking-widest">
                    Restricted Access // Level 5 Clearance
                  </p>
                </div>

                <div className="w-full h-px bg-linear-to-r from-transparent via-gray-800 to-transparent" />

                <button
                  onClick={handleSignIn}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className="relative w-full group/btn overflow-hidden rounded-lg bg-gray-900 px-4 py-3 transition-all hover:bg-gray-800 border border-gray-800 hover:border-gray-700"
                >
                  <div className="flex items-center justify-center gap-3 relative z-10">
                    <GithubIcon className="w-5 h-5 text-gray-400 group-hover/btn:text-white transition-colors" />

                    <span className="font-mono text-sm text-gray-300 group-hover/btn:text-white transition-colors">
                      AUTHENTICATE_USER
                    </span>
                  </div>
                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-linear-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                </button>

                {errorMessage && (
                  <div className="w-full rounded-md border border-red-500/20 bg-red-500/5 px-3 py-2 text-[11px] font-mono text-red-300">
                    {errorMessage}
                  </div>
                )}

                <div className="flex items-center gap-2 text-[10px] text-gray-600 font-mono">
                  <div className="w-2 h-2 rounded-full bg-green-500/50 animate-pulse" />
                  SECURE_CONNECTION_ESTABLISHED
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
