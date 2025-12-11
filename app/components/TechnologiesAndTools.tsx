import React from "react";
import Image from "next/image";
import { Card, CardContent } from "./ui/Card";
import { SectionHeader } from "./ui/SectionHeader";
import { Doc } from "../../convex/_generated/dataModel";

interface TechnologiesAndToolsProps {
    skills: Doc<"skills">[];
}

export default function TechnologiesAndTools({ skills }: TechnologiesAndToolsProps) {
    // Flatten all skills from all categories into a single list for display
    // You might want to group them by category in the future, but the original design was a flat grid.
    const allTechnologies = skills.flatMap(skillCategory => skillCategory.items);

    return (
        <section className="max-w-5xl mx-auto px-4 mb-24">
            <SectionHeader title="Technologies & Tools" subtitle="My technical arsenal." />

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {allTechnologies.map((tech, index) => (
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
