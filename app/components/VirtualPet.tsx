"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Configuration from debug tool
const SPRITE_WIDTH = 55;
const SPRITE_HEIGHT = 55;
const SOURCE_SCALE = 0.3;
const FRAMES_PER_ROW = 5;
const ROWS = 5;
const OFFSET_X = 18;
const OFFSET_Y = 18;
const NATURAL_WIDTH = 1024;
const NATURAL_HEIGHT = 1024;

export default function VirtualPet() {
    const [mounted, setMounted] = useState(false);
    const [target, setTarget] = useState({ x: 0, y: 0 });
    const [direction, setDirection] = useState<"left" | "right">("left");
    const [action, setAction] = useState<"walking" | "sitting" | "playful">("sitting");
    const [duration, setDuration] = useState(0);
    const [bark, setBark] = useState<string | null>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [scale, setScale] = useState(2);

    // Refs to track state in asynchronous callbacks
    const actionRef = useRef(action);
    const barkRef = useRef(bark);
    const isHoveredRef = useRef(isHovered);
    const containerRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => { actionRef.current = action; }, [action]);
    useEffect(() => { barkRef.current = bark; }, [bark]);
    useEffect(() => { isHoveredRef.current = isHovered; }, [isHovered]);

    useEffect(() => {
        const handleResize = () => {
            setScale(window.innerWidth < 768 ? 1 : 2);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleMouseEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setIsHovered(true);
        setAction("playful");

        if (containerRef.current) {
            const style = window.getComputedStyle(containerRef.current);
            const matrix = new DOMMatrix(style.transform);
            setTarget({ x: matrix.m41, y: matrix.m42 });
            setDuration(0);
        }
    };

    const move = useCallback(() => {
        setAction("walking");
        const padding = 50;
        const spriteSize = SPRITE_WIDTH * scale;

        // Calculate safe boundaries to keep pet fully on screen
        const minX = padding;
        const maxX = window.innerWidth - spriteSize - padding;

        const maxY = window.innerHeight - spriteSize - padding;
        const minY = window.innerHeight - 200; // Allow walking in bottom 200px area

        const newX = Math.max(minX, Math.random() * (maxX - minX) + minX);
        const newY = Math.max(minY, Math.random() * (maxY - minY) + minY);

        const dx = newX - target.x;

        // Determine direction based on horizontal movement
        if (dx !== 0) {
            setDirection(dx > 0 ? "right" : "left");
        }

        const dy = newY - target.y;
        const dist = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
        const speed = 80;
        const newDuration = dist / speed;

        setDuration(newDuration);
        setTarget({ x: newX, y: newY });
    }, [target, scale]);

    const handleMouseLeave = () => {
        setIsHovered(false);
        move();
    };

    const planNextMove = useCallback(() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        // If hovered, stop planning. handleMouseLeave will restart us.
        if (isHoveredRef.current) return;

        // If barking, wait before moving to avoid sliding
        if (barkRef.current) {
            timeoutRef.current = setTimeout(() => planNextMove(), 500);
            return;
        }

        const rand = Math.random();
        if (rand < 0.3) {
            // Sit
            setAction("sitting");
            timeoutRef.current = setTimeout(() => {
                planNextMove();
            }, 3000 + Math.random() * 2000);
        } else if (rand < 0.4) {
            // Playful
            setAction("playful");
            timeoutRef.current = setTimeout(() => {
                planNextMove();
            }, 2000 + Math.random() * 2000);
        } else {
            // Walk
            move();
        }
    }, [move]);

    useEffect(() => {
        if (!mounted) return;

        const barkInterval = setInterval(() => {
            // Don't bark if walking
            if (actionRef.current === "walking") return;

            if (Math.random() < 0.1) {
                const barks = ["Woof!", "Arf!", "Yap!", "🦴"];
                setBark(barks[Math.floor(Math.random() * barks.length)]);
                setTimeout(() => setBark(null), 2000);
            }
        }, 5000);

        return () => clearInterval(barkInterval);
    }, [mounted]);

    useEffect(() => {
        setMounted(true);
        const spriteSize = SPRITE_WIDTH * scale;
        setTarget({
            x: window.innerWidth - spriteSize - 50,
            y: window.innerHeight - spriteSize - 50
        });

        timeoutRef.current = setTimeout(() => {
            planNextMove();
        }, 1000);

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getSpriteConfig = () => {
        if (bark) {
            return {
                url: "/pet/barking.png",
                shouldFlip: direction === "right"
            };
        }
        if (action === "walking") {
            return {
                url: direction === "left" ? "/pet/walking-left.png" : "/pet/walking-right.png",
                shouldFlip: false
            };
        }
        if (action === "playful") {
            return {
                url: "/pet/playful.png",
                shouldFlip: direction === "right"
            };
        }
        // Default sitting
        return {
            url: "/pet/sitting-facing-left.png",
            shouldFlip: direction === "right"
        };
    };

    if (!mounted) return null;

    const { url, shouldFlip } = getSpriteConfig();

    const spriteWidthPx = SPRITE_WIDTH * scale;
    const spriteHeightPx = SPRITE_HEIGHT * scale;

    const sheetWidthPx = NATURAL_WIDTH * SOURCE_SCALE * scale;
    const sheetHeightPx = NATURAL_HEIGHT * SOURCE_SCALE * scale;

    const gridWidthPx = SPRITE_WIDTH * FRAMES_PER_ROW * scale;
    const gridHeightPx = SPRITE_HEIGHT * ROWS * scale;

    // Negate offsets to shift the background "camera" to the correct position
    const startX = -OFFSET_X * scale;
    const endX = startX - gridWidthPx;

    const startY = -OFFSET_Y * scale;
    const endY = startY - gridHeightPx;

    return (
        <motion.div
            ref={containerRef}
            initial={false}
            animate={{ x: target.x, y: target.y }}
            transition={{ duration: duration, ease: "linear" }}
            onAnimationComplete={() => {
                if (action === "walking") {
                    // When walk finishes, plan next move immediately
                    planNextMove();
                }
            }}
            className="fixed z-50 cursor-pointer drop-shadow-lg"
            style={{ left: 0, top: 0 }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleMouseEnter}
            onTouchEnd={handleMouseLeave}
        >
            <div className="relative">
                <AnimatePresence>
                    {bark && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.8 }}
                            animate={{ opacity: 1, y: -40, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-xs font-bold px-2 py-1 rounded-lg whitespace-nowrap border-2 border-black"
                        >
                            {bark}
                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white border-r-2 border-b-2 border-black rotate-45"></div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div
                    className={`transition-transform duration-200 ${shouldFlip ? "scale-x-[-1]" : ""}`}
                    style={{
                        width: spriteWidthPx,
                        height: spriteHeightPx,
                        imageRendering: "pixelated",
                        backgroundImage: `url("${url}")`,
                        backgroundSize: `${sheetWidthPx}px ${sheetHeightPx}px`,
                        backgroundPosition: `${startX}px ${startY}px`,
                        animation: `vp-sprite-x 1s steps(${FRAMES_PER_ROW}) infinite, vp-sprite-y 5s steps(${ROWS}) infinite`
                    }}
                />
                <style>{`
                    @keyframes vp-sprite-x {
                        from { background-position-x: ${startX}px; }
                        to { background-position-x: ${endX}px; }
                    }
                    @keyframes vp-sprite-y {
                        from { background-position-y: ${startY}px; }
                        to { background-position-y: ${endY}px; }
                    }
                `}</style>
            </div>
        </motion.div>
    );
}
