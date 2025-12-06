"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import FeaturedCompany from "./FeaturedCompany";
import CompanyCarousel from "./CompanyCarousel";
import TechStackCarousel from "./TechStackCarousel";
import { projects, featuredCompany, type Project } from "@/lib/data";

export default function ProjectShowcase() {
    const [activeTab, setActiveTab] = useState<"work" | "personal">("work");
    const [selectedTech, setSelectedTech] = useState<string | null>(null);

    const calculateLevelInfo = (exp: number) => {
        let lvl = 1;
        let xpRequired = 1000;
        let accumulatedXp = 0;

        while (exp >= accumulatedXp + xpRequired) {
            accumulatedXp += xpRequired;
            lvl++;
            xpRequired += 500;
        }

        return {
            level: lvl,
            currentXp: exp - accumulatedXp,
            requiredXp: xpRequired,
            progress: ((exp - accumulatedXp) / xpRequired) * 100
        };
    };

    const getTitle = (level: number) => {
        if (level >= 50) return "Mythical Developer";
        if (level >= 30) return "Grandmaster Architect";
        if (level >= 20) return "Principal Engineer";
        if (level >= 10) return "Senior Engineer";
        if (level >= 5) return "Mid-Level Engineer";
        return "Junior Engineer";
    };

    const getTopSkills = (allProjects: Project[]) => {
        const skillMap: Record<string, number> = {};

        allProjects.forEach(project => {
            const projectXp = project.xp || 1000;
            project.techStack.forEach(tech => {
                skillMap[tech] = (skillMap[tech] || 0) + projectXp;
            });
        });

        const maxSkillXp = Math.max(...Object.values(skillMap));

        return Object.entries(skillMap)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 4)
            .map(([name, xp]) => ({
                name,
                xp,
                percentage: (xp / maxSkillXp) * 100
            }));
    };

    const getAttributes = (allProjects: Project[]) => {
        const stats = {
            "Backend": 0,
            "Frontend": 0,
            "DevOps": 0,
            "AI & Data": 0,
        };

        const techMap: Record<string, keyof typeof stats> = {
            "React": "Frontend", "Next.js": "Frontend", "Tailwind CSS": "Frontend", "Vue.js": "Frontend", "React Native": "Frontend",
            "Node.js": "Backend", "PostgreSQL": "Backend", "Prisma": "Backend", "GraphQL": "Backend",
            "Docker": "DevOps", "AWS": "DevOps", "Cloudflare Workers": "DevOps", "DigitalOcean": "DevOps",
            "OpenAI API": "AI & Data", "Elasticsearch": "AI & Data", "Redis": "AI & Data", "Zod": "Backend"
        };

        allProjects.forEach(project => {
            const projectXp = project.xp || 1000;
            const techCount = project.techStack.length;
            if (techCount === 0) return;

            const xpPerTech = projectXp / techCount;

            project.techStack.forEach(tech => {
                const stat = techMap[tech] || "Backend"; // Default to Backend if unknown
                stats[stat] += xpPerTech;
            });
        });

        const maxStat = Math.max(...Object.values(stats));
        return Object.entries(stats).map(([key, value]) => ({
            name: key,
            value: Math.round(value),
            percentage: (value / maxStat) * 100
        }));
    };

    const BASE_XP = 1000;
    const totalExp = projects.reduce((acc, project) => acc + (project.xp || BASE_XP), 0);
    const levelInfo = calculateLevelInfo(totalExp);
    const topSkills = getTopSkills(projects);
    const attributes = getAttributes(projects);
    const currentTitle = getTitle(levelInfo.level);

    const filteredProjects = projects.filter(
        (project) => {
            const matchesTab = project.category === activeTab;
            const matchesTech = selectedTech ? project.techStack.includes(selectedTech) : true;
            return matchesTab && matchesTech;
        }
    );

    return (
        <div className="min-h-screen bg-gray-950 text-white font-sans selection:bg-blue-500/30">
            {/* Hero Section */}
            <header className="relative pt-20 pb-16 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-blue-900/20 via-gray-900/0 to-gray-900/0 pointer-events-none"></div>

                <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
                    <div className="inline-block mb-4 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-wider uppercase animate-in fade-in slide-in-from-bottom-4 duration-500">
                        Level {levelInfo.level} {currentTitle}
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight bg-clip-text text-transparent bg-linear-to-b from-white to-white/60 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                        Kyle Osunero
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-2xl mx-auto font-light animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                        Software Engineer crafting robust backends and intuitive frontends.
                    </p>

                    <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-gray-400 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                        <a href="mailto:kyle.osunero.21@gmail.com" className="hover:text-white transition-colors flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                            Email
                        </a>
                        <Link href="https://www.linkedin.com/in/ky-os/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                            LinkedIn
                        </Link>
                        <Link href="https://github.com/ky-os" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                            GitHub
                        </Link>
                        <Link href="/api/resume/pdf" className="hover:text-white transition-colors flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                            Resume
                        </Link>
                    </div>
                </div>
            </header>

            {/* Stats Section */}
            <section className="max-w-5xl mx-auto px-4 mb-20">
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 p-6 md:p-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-400">
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                        {/* XP Bar */}
                        <div className="w-full md:w-1/3">
                            <div className="flex justify-between text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">
                                <span>Progress to Next Level</span>
                                <span className="text-blue-400">{levelInfo.currentXp} / {levelInfo.requiredXp} XP</span>
                            </div>
                            <div className="h-4 bg-gray-800 rounded-full overflow-hidden border border-gray-700 relative shadow-inner">
                                <div
                                    className="h-full bg-linear-to-r from-blue-600 to-purple-600 transition-all duration-1000 ease-out relative"
                                    style={{ width: `${levelInfo.progress}%` }}
                                >
                                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                                </div>
                            </div>
                            <p className="text-center text-xs text-gray-600 mt-3 font-mono">
                                Total XP Earned: {totalExp.toLocaleString()}
                            </p>
                        </div>

                        {/* Attributes */}
                        <div className="w-full md:w-2/3 grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {attributes.map((attr) => (
                                <div key={attr.name} className="bg-gray-800/30 rounded-lg p-3 border border-gray-700/30 text-center group hover:border-gray-600 transition-colors">
                                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">{attr.name}</div>
                                    <div className="relative h-16 w-full bg-gray-900/50 rounded overflow-hidden flex items-end justify-center">
                                        <div
                                            className={`w-full mx-3 rounded-t transition-all duration-1000 ${attr.name === 'Backend' ? 'bg-red-500/60 group-hover:bg-red-500' :
                                                attr.name === 'Frontend' ? 'bg-green-500/60 group-hover:bg-green-500' :
                                                    attr.name === 'DevOps' ? 'bg-blue-500/60 group-hover:bg-blue-500' :
                                                        'bg-purple-500/60 group-hover:bg-purple-500'
                                                }`}
                                            style={{ height: `${attr.percentage}%` }}
                                        ></div>
                                    </div>
                                    <div className="mt-2 text-lg font-bold text-white">{attr.value}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Carousels */}
            <div className="space-y-0 mb-24">
                <CompanyCarousel />
                <TechStackCarousel />
            </div>

            <main className="max-w-5xl mx-auto px-4 pb-24">
                {/* Featured Section */}
                <section className="mb-24">
                    <div className="flex items-center gap-4 mb-8">
                        <h2 className="text-2xl font-bold text-white">Featured Experience</h2>
                        <div className="h-px bg-gray-800 flex-1"></div>
                    </div>
                    <FeaturedCompany {...featuredCompany} />
                </section>

                {/* Projects Section */}
                <section id="projects">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                        <div className="flex items-center gap-4">
                            <h2 className="text-2xl font-bold text-white">Project Archive</h2>
                            <div className="h-px bg-gray-800 w-12 md:w-24"></div>
                        </div>

                        {/* Tabs */}
                        <div className="bg-gray-900 p-1 rounded-lg border border-gray-800 inline-flex">
                            <button
                                onClick={() => setActiveTab("work")}
                                className={`px-5 py-2 rounded-md text-sm font-medium transition-all duration-200 ${activeTab === "work"
                                    ? "bg-gray-800 text-white shadow-sm"
                                    : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                                    }`}
                            >
                                Work
                            </button>
                            <button
                                onClick={() => setActiveTab("personal")}
                                className={`px-5 py-2 rounded-md text-sm font-medium transition-all duration-200 ${activeTab === "personal"
                                    ? "bg-gray-800 text-white shadow-sm"
                                    : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                                    }`}
                            >
                                Personal
                            </button>
                        </div>
                    </div>

                    {/* Top Skills Filter */}
                    <div className="mb-10">
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Filter by Top Skills</p>
                        <div className="flex flex-wrap gap-3">
                            {topSkills.map((skill) => (
                                <button
                                    key={skill.name}
                                    onClick={() => setSelectedTech(selectedTech === skill.name ? null : skill.name)}
                                    className={`group flex items-center gap-3 px-4 py-2 rounded-lg border transition-all duration-200 ${selectedTech === skill.name
                                        ? 'bg-blue-500/10 border-blue-500/50 text-blue-400'
                                        : 'bg-gray-900 border-gray-800 text-gray-400 hover:border-gray-700 hover:text-gray-300'
                                        }`}
                                >
                                    <span className="text-sm font-medium">{skill.name}</span>
                                    <span className={`text-xs px-1.5 py-0.5 rounded bg-gray-800 ${selectedTech === skill.name ? 'text-blue-400' : 'text-gray-500'}`}>
                                        {skill.xp} XP
                                    </span>
                                </button>
                            ))}
                            {selectedTech && (
                                <button
                                    onClick={() => setSelectedTech(null)}
                                    className="px-4 py-2 text-sm text-gray-500 hover:text-white transition-colors"
                                >
                                    Clear Filter
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Project List */}
                    <div className="relative border-l border-gray-800 ml-3 md:ml-6 space-y-12 pb-12">
                        {filteredProjects.map((project, index) => (
                            <div
                                key={`${project.title}-${index}`}
                                className="ml-8 md:ml-12 relative group animate-in fade-in slide-in-from-bottom-4 duration-500"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {/* Timeline Dot */}
                                <span
                                    className={`absolute -left-[41px] md:-left-[57px] top-6 flex h-4 w-4 items-center justify-center rounded-full ring-4 ring-gray-950 transition-colors duration-300 ${activeTab === "work" ? "bg-blue-600" : "bg-purple-600"
                                        }`}
                                >
                                </span>

                                {/* Content Card */}
                                <div className="group/card relative">
                                    <div className="absolute -inset-0.5 bg-linear-to-r from-blue-500/0 via-blue-500/0 to-purple-500/0 group-hover/card:from-blue-500/20 group-hover/card:via-purple-500/20 group-hover/card:to-blue-500/20 rounded-xl opacity-0 group-hover/card:opacity-100 transition duration-500 blur-sm"></div>
                                    <div className="relative bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-colors">
                                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
                                            <div className="flex items-start gap-4 flex-1 min-w-0">
                                                {project.logo && (
                                                    <div className="shrink-0">
                                                        <Image
                                                            src={project.logo}
                                                            alt={`${project.title} logo`}
                                                            width={48}
                                                            height={48}
                                                            unoptimized
                                                            className="w-12 h-12 rounded-lg bg-gray-800 p-2 object-contain border border-gray-700"
                                                        />
                                                    </div>
                                                )}
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-xl font-bold text-white group-hover/card:text-blue-400 transition-colors leading-tight text-wrap">
                                                        {project.title}
                                                    </h3>
                                                    <p className="text-gray-400 font-medium mt-1 truncate">
                                                        {project.role}{" "}
                                                        {project.company && <span className="text-gray-600">at {project.company}</span>}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap items-center gap-3 shrink-0 md:ml-4 md:flex-col md:items-end lg:flex-row lg:items-center">
                                                <span className="text-xs font-mono text-gray-500 bg-gray-950 px-3 py-1 rounded-full border border-gray-800 whitespace-nowrap">
                                                    {project.date}
                                                </span>
                                                <span className={`text-xs font-bold px-3 py-1 rounded-full border whitespace-nowrap ${activeTab === 'work'
                                                    ? 'text-blue-400 bg-blue-400/5 border-blue-400/20'
                                                    : 'text-purple-400 bg-purple-400/5 border-purple-400/20'
                                                    }`}>
                                                    +{project.xp || 1000} XP
                                                </span>
                                            </div>
                                        </div>

                                        <ul className="space-y-3 mb-6">
                                            {project.description.map((desc, i) => (
                                                <li key={i} className="flex items-start text-gray-300 text-sm leading-relaxed">
                                                    <span className={`mr-3 mt-2 h-1 w-1 shrink-0 rounded-full ${activeTab === 'work' ? 'bg-blue-500' : 'bg-purple-500'}`}></span>
                                                    {desc}
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-800">
                                            {project.techStack.map((tech, i) => (
                                                <button
                                                    key={i}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedTech(selectedTech === tech ? null : tech);
                                                    }}
                                                    className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${selectedTech === tech
                                                        ? 'bg-blue-500/20 text-blue-300'
                                                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-200'
                                                        }`}
                                                >
                                                    {tech}
                                                </button>
                                            ))}
                                        </div>

                                        {project.link && project.link !== "#" && (
                                            <div className="absolute top-6 right-6 opacity-0 group-hover/card:opacity-100 transition-opacity hidden md:block">
                                                <Link
                                                    href={project.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-gray-500 hover:text-white transition-colors"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                                                    </svg>
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}
