"use client";

import React from "react";
import Image from "next/image";

const technologies = [
    { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs/white" },
    { name: "React", icon: "https://cdn.simpleicons.org/react/61DAFB" },
    { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript/3178C6" },
    { name: "Tailwind CSS", icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
    { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs/339933" },
    { name: "PostgreSQL", icon: "https://cdn.simpleicons.org/postgresql/4169E1" },
    { name: "Drizzle ORM", icon: "https://cdn.simpleicons.org/drizzle/C5F749" },
    { name: "Prisma", icon: "https://cdn.simpleicons.org/prisma/white" },
    { name: "Docker", icon: "https://cdn.simpleicons.org/docker/2496ED" },
    { name: "AWS", icon: "https://cdn.simpleicons.org/amazonaws/FF9900" },
    { name: "GraphQL", icon: "https://cdn.simpleicons.org/graphql/E10098" },
    { name: "Rust", icon: "https://cdn.simpleicons.org/rust/white" },
    { name: "Redis", icon: "https://cdn.simpleicons.org/redis/DC382D" },
    { name: "Git", icon: "https://cdn.simpleicons.org/git/F05032" },
];

export default function TechStackCarousel() {
    return (
        <div className="w-full py-8 overflow-hidden border-b border-gray-800/50 bg-gray-900/20 backdrop-blur-sm mb-16">
            <div className="max-w-7xl mx-auto px-4 md:px-8 relative">
                <div className="text-center mb-6">
                    <p className="text-xs font-bold text-blue-400/80 uppercase tracking-[0.2em]">
                        Technologies & Tools
                    </p>
                </div>

                <div className="relative flex overflow-hidden group mask-linear-fade">
                    <div className="flex animate-marquee-reverse min-w-full shrink-0 justify-around gap-8 md:gap-16 px-6 md:px-12">
                        {technologies.map((tech, index) => (
                            <TechItem key={`${tech.name}-1-${index}`} tech={tech} />
                        ))}
                    </div>
                    <div className="flex animate-marquee-reverse min-w-full shrink-0 justify-around gap-8 md:gap-16 px-6 md:px-12">
                        {technologies.map((tech, index) => (
                            <TechItem key={`${tech.name}-2-${index}`} tech={tech} />
                        ))}
                    </div>
                </div>

                {/* Fade edges */}
                <div className="absolute inset-y-0 left-0 w-20 bg-linear-to-r from-gray-900 to-transparent z-10 pointer-events-none"></div>
                <div className="absolute inset-y-0 right-0 w-20 bg-linear-to-l from-gray-900 to-transparent z-10 pointer-events-none"></div>
            </div>

            <style jsx>{`
                .animate-marquee-reverse {
                    animation: marquee-reverse 40s linear infinite;
                }
                @keyframes marquee-reverse {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(0%); }
                }
                /* Pause on hover */
                .group:hover .animate-marquee-reverse {
                    animation-play-state: paused;
                }
            `}</style>
        </div>
    );
}

function TechItem({ tech }: { tech: typeof technologies[0] }) {
    return (
        <div
            className="flex flex-col items-center gap-3 opacity-60 hover:opacity-100 transition-all duration-300 group/item cursor-default"
        >
            <div className="relative w-10 h-10 transition-transform duration-300 group-hover/item:scale-110 group-hover/item:drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]">
                <Image
                    src={tech.icon}
                    alt={tech.name}
                    width={40}
                    height={40}
                    className="object-contain w-full h-full"
                    unoptimized
                />
            </div>
            <span className="text-xs font-medium text-gray-400 group-hover/item:text-blue-300 transition-colors whitespace-nowrap">
                {tech.name}
            </span>
        </div>
    );
}
