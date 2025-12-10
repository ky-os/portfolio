import React from "react";
import { twMerge } from "tailwind-merge";

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    className?: string;
    align?: "left" | "center" | "right";
}

export function SectionHeader({ title, subtitle, className, align = "left" }: SectionHeaderProps) {
    return (
        <div className={twMerge(
            "mb-12",
            align === "center" && "text-center",
            align === "right" && "text-right",
            className
        )}>
            <div className={twMerge(
                "flex items-center gap-4 mb-4",
                align === "center" && "justify-center",
                align === "right" && "justify-end"
            )}>
                <h2 className="text-3xl font-bold text-white tracking-tight">{title}</h2>
                {align === "left" && <div className="h-px bg-gray-800 flex-1 max-w-[100px]"></div>}
            </div>
            {subtitle && (
                <p className={twMerge(
                    "text-gray-400 max-w-2xl text-lg font-light",
                    align === "center" && "mx-auto",
                    align === "right" && "ml-auto"
                )}>
                    {subtitle}
                </p>
            )}
        </div>
    );
}
