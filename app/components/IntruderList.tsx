"use client";

import React from "react";
import { Preloaded, usePreloadedQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card, CardContent } from "@/app/components/ui/Card";
import { SectionHeader } from "@/app/components/ui/SectionHeader";
import Image from "next/image";
import Link from "next/link";
import { ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";

interface IntruderListProps {
    preloadedIntruders: Preloaded<typeof api.queries.getIntruders>;
}

export default function IntruderList({ preloadedIntruders }: IntruderListProps) {
    const intruders = usePreloadedQuery(preloadedIntruders);

    return (
        <div className="min-h-screen bg-black text-white p-8 flex flex-col items-center justify-center relative overflow-hidden">
            {/* Background Matrix-like effect or red alarm overlay could go here */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-black to-black pointer-events-none" />

            <div className="relative z-10 max-w-4xl w-full flex flex-col items-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12 text-center"
                >
                    <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-red-500/10 border border-red-500/30 mb-6 animate-pulse">
                        <ShieldAlert className="w-12 h-12 text-red-500" />
                    </div>
                    <h1 className="text-5xl font-bold text-red-500 mb-4 tracking-tighter">ACCESS DENIED</h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Nice try! This area is restricted to the portfolio owner only.
                        But since you made it this far, you have been immortalized on the...
                    </p>
                </motion.div>

                <SectionHeader title="Wall of Intruders" subtitle="Top unauthorized access attempts" align="center" className="mb-8" />

                <div className="w-full grid gap-4">
                    <Card className="bg-gray-900/80 border-red-900/30">
                        <CardContent className="p-0">
                            <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-800 text-sm font-medium text-gray-400 uppercase tracking-wider">
                                <div className="col-span-1 text-center">#</div>
                                <div className="col-span-7">Intruder</div>
                                <div className="col-span-4 text-right">Attempts</div>
                            </div>
                            <div className="max-h-[400px] overflow-y-auto overflow-x-hidden custom-scrollbar">
                                {intruders === undefined ? (
                                    <div className="p-8 text-center text-gray-500">Loading intruders...</div>
                                ) : intruders.length === 0 ? (
                                    <div className="p-8 text-center text-gray-500">No intruders yet. You are the first!</div>
                                ) : (
                                    intruders.map((intruder, index) => (
                                        <motion.div
                                            key={intruder._id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="grid grid-cols-12 gap-4 p-4 border-b border-gray-800/50 hover:bg-red-900/10 transition-colors items-center"
                                        >
                                            <div className="col-span-1 text-center font-mono text-gray-500">
                                                {index + 1}
                                            </div>
                                            <div className="col-span-7 flex items-center gap-3">
                                                <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-800 border border-gray-700">
                                                    {intruder.image ? (
                                                        <Image
                                                            src={intruder.image}
                                                            alt={intruder.name || "Intruder"}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-xs font-bold text-gray-500">
                                                            ?
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-gray-200">
                                                        {intruder.name || "Anonymous Intruder"}
                                                    </span>
                                                    <span className="text-xs text-gray-500 font-mono">
                                                        {new Date(intruder._creationTime).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="col-span-4 text-right font-mono text-red-400 font-bold">
                                                {intruder.attempts}
                                            </div>
                                        </motion.div>
                                    ))
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="mt-12 text-center">
                    <Link href="/" className="text-gray-500 hover:text-white transition-colors text-sm underline underline-offset-4">
                        Return to Safety
                    </Link>
                </div>
            </div>
        </div>
    );
}
