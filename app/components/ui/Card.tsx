import React from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

interface CardProps {
    children: React.ReactNode;
    className?: string;
    hoverEffect?: boolean;
    delay?: number;
}

export function Card({ children, className, hoverEffect = true, delay = 0 }: CardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            className={twMerge(
                "bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden",
                hoverEffect && "hover:border-gray-700 hover:bg-gray-900/80 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5",
                className
            )}
        >
            {children}
        </motion.div>
    );
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={twMerge("p-6 border-b border-gray-800/50", className)}>{children}</div>;
}

export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={twMerge("p-6", className)}>{children}</div>;
}

export function CardFooter({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={twMerge("p-6 border-t border-gray-800/50 bg-gray-900/30", className)}>{children}</div>;
}
