import React from "react";
import Image from "next/image";
import { Card, CardContent } from "./ui/Card";
import { SectionHeader } from "./ui/SectionHeader";

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
    { name: "Redis", icon: "https://cdn.simpleicons.org/redis/DC382D" },
    { name: "Git", icon: "https://cdn.simpleicons.org/git/F05032" },
];

export default function TechnologiesAndTools() {
    return (
        <section className="max-w-5xl mx-auto px-4 mb-24">
            <SectionHeader title="Technologies & Tools" subtitle="My technical arsenal." />
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {technologies.map((tech, index) => (
                    <Card key={index} delay={index * 0.05} className="group hover:bg-gray-800/50 border-gray-800/50">
                        <CardContent className="p-4 flex flex-col items-center justify-center gap-3">
                            <div className="relative w-10 h-10 transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]">
                                <Image
                                    src={tech.icon}
                                    alt={tech.name}
                                    width={40}
                                    height={40}
                                    className="object-contain w-full h-full"
                                    unoptimized
                                />
                            </div>
                            <span className="text-xs font-medium text-gray-400 group-hover:text-white transition-colors text-center">
                                {tech.name}
                            </span>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
}
