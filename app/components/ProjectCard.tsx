import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink, Calendar, Award } from "lucide-react";
import { type Project } from "@/lib/data";

interface ProjectCardProps {
    project: Project;
    index: number;
    activeTab: "work" | "personal";
    selectedTech: string | null;
    onTechClick: (tech: string) => void;
    isLast?: boolean;
}

export default function ProjectCard({
    project,
    index,
    activeTab,
    selectedTech,
    onTechClick,
    isLast = false
}: ProjectCardProps) {
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

    const themeColor = activeTab === "work" ? "blue" : "purple";
    const gradientFrom = activeTab === "work" ? "from-blue-500" : "from-purple-500";
    const gradientTo = activeTab === "work" ? "to-cyan-500" : "to-pink-500";
    const borderColor = activeTab === "work" ? "group-hover:border-blue-500/50" : "group-hover:border-purple-500/50";
    const shadowColor = activeTab === "work" ? "group-hover:shadow-blue-500/20" : "group-hover:shadow-purple-500/20";
    const textColor = activeTab === "work" ? "text-blue-400" : "text-purple-400";
    const bgHover = activeTab === "work" ? "hover:bg-blue-500/20" : "hover:bg-purple-500/20";

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
                        className={`w-full bg-linear-to-b ${gradientFrom} ${gradientTo} opacity-50`}
                    />
                </div>
            )}

            {/* Icon Bubble */}
            <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={`relative z-10 shrink-0 w-14 h-14 md:w-18 md:h-18 rounded-2xl bg-gray-900 border border-gray-800 flex items-center justify-center shadow-lg ${borderColor} ${shadowColor} transition-all duration-300 self-start`}
            >
                {project.logo ? (
                    <div className="w-10 h-10 md:w-12 md:h-12 relative">
                        <Image
                            src={project.logo}
                            alt={`${project.title} logo`}
                            fill
                            className="object-contain"
                            unoptimized
                        />
                    </div>
                ) : (
                    <div className={`text-xl font-bold ${textColor}`}>
                        {project.title.substring(0, 2).toUpperCase()}
                    </div>
                )}
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
                        background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(${activeTab === "work" ? "59, 130, 246" : "168, 85, 247"}, 0.1), transparent 40%)`
                    }}
                />

                <div className="relative z-10">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
                        <div className="flex-1 min-w-0">
                            <h3 className={`text-xl md:text-2xl font-bold text-white group-hover/card:${textColor} transition-colors leading-tight`}>
                                {project.title}
                            </h3>
                            <p className="text-gray-400 font-medium mt-1 flex items-center gap-2">
                                {project.role}
                                {project.company && (
                                    <>
                                        <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                                        <span className="text-gray-500">{project.company}</span>
                                    </>
                                )}
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 shrink-0 md:flex-col md:items-end lg:flex-row lg:items-center">
                            <div className="flex items-center gap-1.5 text-xs font-mono text-gray-500 bg-gray-950/50 px-3 py-1.5 rounded-full border border-gray-800">
                                <Calendar size={12} />
                                {project.date}
                            </div>
                            <div className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border ${activeTab === "work" ? "text-blue-400 bg-blue-400/5 border-blue-400/20" : "text-purple-400 bg-purple-400/5 border-purple-400/20"}`}>
                                <Award size={12} />
                                +{project.xp || 1000} XP
                            </div>
                        </div>
                    </div>

                    <ul className="space-y-3 mb-6">
                        {project.description.map((desc, i) => (
                            <li key={i} className="flex items-start text-gray-300 text-sm leading-relaxed group/item">
                                <span className={`mr-3 mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${activeTab === "work" ? "bg-blue-500" : "bg-purple-500"} group-hover/item:scale-150 transition-transform duration-300`}></span>
                                <span className="group-hover/item:text-gray-200 transition-colors">{desc}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="flex flex-wrap gap-2 pt-6 border-t border-gray-800/50">
                        {project.techStack.map((tech, i) => (
                            <button
                                key={i}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onTechClick(tech);
                                }}
                                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all duration-200 border ${selectedTech === tech
                                    ? `${activeTab === "work" ? "bg-blue-500/20 text-blue-300 border-blue-500/30" : "bg-purple-500/20 text-purple-300 border-purple-500/30"}`
                                    : `bg-gray-800/50 text-gray-400 border-transparent hover:border-gray-700 hover:text-gray-200 ${bgHover}`
                                    }`}
                            >
                                {tech}
                            </button>
                        ))}
                    </div>

                    {project.link && project.link !== "#" && (
                        <div className="absolute top-0 right-0 p-4 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                            <Link
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg bg-gray-800/80 text-gray-400 hover:text-white hover:bg-blue-600 transition-all shadow-lg backdrop-blur-sm flex items-center gap-2"
                            >
                                <span className="text-xs font-bold">Visit</span>
                                <ExternalLink size={16} />
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
