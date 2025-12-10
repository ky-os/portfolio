"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface ProcessStepProps {
    title: string;
    role: string;
    description: string;
    icon: React.ReactNode;
    isLast?: boolean;
    bmadRole: string;
    imagePath: string;
    index: number;
}

export default function ProcessStep({
    title,
    role,
    description,
    icon,
    isLast = false,
    bmadRole,
    imagePath,
    index,
}: ProcessStepProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative flex flex-col md:flex-row gap-6 md:gap-10 group"
        >
            {/* Line connecting steps */}
            {!isLast && (
                <div className="hidden md:block absolute left-9 top-16 bottom-0 w-0.5 bg-gray-800 overflow-hidden">
                    <motion.div
                        initial={{ height: "0%" }}
                        whileInView={{ height: "100%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="w-full bg-linear-to-b from-blue-500/50 to-purple-500/50"
                    />
                </div>
            )}

            {/* Icon Bubble */}
            <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="hidden md:flex relative z-10 shrink-0 w-14 h-14 md:w-18 md:h-18 rounded-2xl bg-gray-900 border border-gray-800 items-center justify-center shadow-lg group-hover:border-blue-500/50 group-hover:shadow-blue-500/20 transition-all duration-300 self-start"
            >
                <div className="text-gray-400 group-hover:text-blue-400 transition-colors duration-300">
                    {icon}
                </div>
            </motion.div>

            {/* Content Card */}
            <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                className="flex-1 bg-gray-900/50 border border-gray-800 rounded-xl p-6 transition-colors relative overflow-hidden group/card hover:border-gray-700"
            >
                {/* Spotlight Effect */}
                <div
                    className="pointer-events-none absolute -inset-px transition duration-300 opacity-0 group-hover/card:opacity-100"
                    style={{
                        background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.1), transparent 40%)`
                    }}
                />

                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                    {/* Background Persona Watermark */}
                    <Image
                        src={imagePath}
                        alt="Persona Watermark"
                        width={100}
                        height={100}
                        className="w-24 h-24 grayscale blur-[1px] rounded-full opacity-50"
                        unoptimized
                    />
                </div>

                <div className="flex flex-col md:flex-row gap-6 relative z-10">
                    <div className="flex-1">
                        <div className="flex flex-col gap-4 md:block">
                            {/* Mobile Icon */}
                            <div className="md:hidden shrink-0 w-12 h-12 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center shadow-lg group-hover:border-blue-500/50 group-hover:shadow-blue-500/20 self-start">
                                <div className="text-gray-400 group-hover:text-blue-400 transition-colors duration-300">
                                    {icon}
                                </div>
                            </div>

                            <div>
                                <div className="flex flex-wrap items-center gap-3 mb-2">
                                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                                        {title}
                                    </h3>
                                    <span className="text-xs font-mono text-gray-500 uppercase tracking-wider border border-gray-800 px-2 py-0.5 rounded bg-gray-950">
                                        {role}
                                    </span>
                                </div>

                                <p className="text-gray-400 leading-relaxed mb-4">
                                    {description}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* AI Persona Card */}
                    <motion.div
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="shrink-0 w-full md:w-48 bg-gray-950/80 rounded-lg p-4 border border-gray-800/50 flex flex-col items-center text-center backdrop-blur-sm shadow-xl cursor-default group/avatar"
                    >
                        <div className="relative w-24 h-24 mb-3 flex items-center justify-center">
                            {/* Tech Ring (Rotating) */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 rounded-full border border-blue-500/20 border-t-blue-400/60 border-r-transparent border-b-blue-400/60 border-l-transparent"
                            />

                            {/* Inner Ring (Counter-Rotating) */}
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-2 rounded-full border border-purple-500/20 border-t-transparent border-r-purple-400/60 border-b-transparent border-l-purple-400/60"
                            />

                            {/* Avatar Container */}
                            <div className="relative w-16 h-16 rounded-full bg-gray-950 overflow-hidden ring-2 ring-blue-500/20 group-hover/avatar:ring-blue-400 transition-all duration-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                                <Image
                                    src={imagePath}
                                    alt={`${bmadRole} Avatar`}
                                    width={64}
                                    height={64}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover/avatar:scale-110"
                                    unoptimized
                                />
                                {/* Hologram Scanline Overlay */}
                                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(59,130,246,0.1)_50%)] bg-size-[100%_4px] pointer-events-none opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-300" />
                            </div>

                            {/* Status Dot */}
                            <div className="absolute bottom-1 right-6 w-3 h-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 border-2 border-gray-950"></span>
                            </div>
                        </div>

                        <div className="text-sm font-bold text-purple-300 mb-1 relative group-hover/avatar:text-purple-200 transition-colors">
                            {bmadRole}
                        </div>
                        <div className="text-[10px] text-purple-400/60 uppercase tracking-wider font-mono flex items-center gap-1 justify-center">
                            <span className="w-1 h-1 bg-purple-500 rounded-full animate-pulse" />
                            AI Agent
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}
