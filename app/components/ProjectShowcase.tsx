"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Project {
    title: string;
    role: string;
    company?: string;
    date: string;
    description: string[];
    techStack: string[];
    link?: string;
    logo?: string;
    category: "work" | "personal";
}

const projects: Project[] = [
    {
        title: "Legacy Platform Revamp & Email System",
        role: "Software Engineer I",
        company: "SolX Technologies Inc.",
        date: "July 2024 - November 2025",
        description: [
            "Revamped large-scale legacy platform with React and Tailwind CSS.",
            "Engineered email notification system using React Email and Amazon SES.",
            "Optimized data loading with React Router, reducing MobX complexity.",
            "Refactored forms using Formik and Yup.",
            "Developed map-based visualization with Leaflet.",
        ],
        techStack: [
            "React",
            "Tailwind CSS",
            "Amazon SES",
            "React Email",
            "MobX",
            "Formik",
            "Yup",
            "Leaflet",
            "Next.js",
        ],
        link: "https://solx.ph",
        logo: "https://www.google.com/s2/favicons?domain=solx.ph&sz=128",
        category: "work",
    },
    {
        title: "FlashCargo",
        role: "Software Engineer",
        company: "StackTrek",
        date: "February 2025 - July 2025",
        description: [
            "Integrated OpenAI to automate logistics data entry, reducing manual effort by auto-generating commodity and pack type suggestions.",
            "Developed a full-stack booking management system with status tracking and real-time comments using Next.js, Prisma, and PostgreSQL.",
            "Engineered complex, multi-step quotation forms for Air, Land, and Sea freight with robust Zod validation and dynamic state management.",
            "Optimized admin workflows by standardizing UI components and implementing mobile-responsive designs for carrier management pages.",
        ],
        techStack: [
            "Next.js 14",
            "TypeScript",
            "PostgreSQL",
            "Prisma",
            "Redis",
            "BullMQ",
            "Tailwind CSS",
            "Lucia Auth",
            "Zod",
            "OpenAI API",
            "Docker",
            "AWS"
        ],
        link: "https://www.flashcargo.ai/",
        logo: "https://icons.duckduckgo.com/ip3/www.flashcargo.ai.ico",
        category: "work",
    },
    {
        title: "Advanced (AI Onboarding)",
        role: "Software Engineer",
        company: "StackTrek",
        date: "April 2025 - June 2025",
        description: [
            "Architected resilient ID capture and verification pipeline with webcam support and OpenAI integration.",
            "Implemented registrant management features including dynamic course selection and batch operations.",
            "Built diploma upload experience with refined UI/UX for mobile and desktop.",
            "Developed full-stack SSR application using React Router 7 and Cloudflare Workers.",
        ],
        techStack: [
            "React Router 7",
            "Cloudflare Workers",
            "PostgreSQL",
            "Drizzle ORM",
            "OpenAI SDK",
            "Cloudflare R2",
            "Tailwind CSS",
            "TypeScript"
        ],
        link: "https://www.advanced.ph/",
        logo: "https://www.google.com/s2/favicons?domain=www.advanced.ph&sz=128",
        category: "work",
    },
    {
        title: "AI Document Discrepancy Scanner",
        role: "Software Engineer",
        company: "StackTrek",
        date: "January 2025 - February 2025",
        description: [
            "AI-powered proof-of-concept for document comparison.",
            "Integrated MS Power Apps, SharePoint, and OpenAI API.",
        ],
        techStack: ["MS Power Apps", "SharePoint", "OpenAI API"],
        link: "#",
        category: "work",
    },
    {
        title: "MySuperCheck",
        role: "Software Engineer",
        company: "StackTrek",
        date: "August 2024 - January 2025",
        description: [
            "Developed a full-stack directory platform using Next.js 14, TypeScript, and PostgreSQL.",
            "Engineered a custom search experience with Elasticsearch, supporting location and availability filtering.",
            "Integrated OpenAI to automate data cleaning and formatting for thousands of business records.",
            "Implemented robust authentication flows including social login, email verification, and password recovery.",
            "Built a comprehensive request management system for professional profile updates and admin approvals.",
        ],
        techStack: [
            "Next.js 14",
            "TypeScript",
            "PostgreSQL",
            "Drizzle ORM",
            "Elasticsearch",
            "Redis",
            "Tailwind CSS",
            "React Hook Form",
            "Zod",
            "OpenAI API",
            "Google Maps API",
            "Docker",
            "AWS S3",
            "Playwright"
        ],
        link: "https://mysupercheck.com/",
        logo: "https://www.google.com/s2/favicons?domain=mysupercheck.com&sz=128",
        category: "work",
    },
    {
        title: "MyBlissmi",
        role: "Software Engineer",
        company: "StackTrek",
        date: "November 2023 - August 2024",
        description: [
            "Maintained React, Vue.js, Node.js repositories.",
            "Managed deployments to DigitalOcean.",
        ],
        techStack: ["React", "Vue.js", "Node.js", "DigitalOcean"],
        link: "https://myblissmi.com/",
        logo: "https://icons.duckduckgo.com/ip3/myblissmi.com.ico",
        category: "work",
    },
    {
        title: "Cult Cellar",
        role: "Software Engineer",
        company: "StackTrek",
        date: "August 2023 - November 2023",
        description: [
            "E-commerce features using Next.js.",
            "Shopify API integration.",
        ],
        techStack: ["Next.js", "Shopify API"],
        link: "https://www.cultcellar.com/",
        logo: "https://www.google.com/s2/favicons?domain=cultcellar.com&sz=128",
        category: "work",
    },
    {
        title: "Mobile App Development",
        role: "Frontend Developer Intern",
        company: "ztock®",
        date: "November 2022 - March 2023",
        description: [
            "Built mobile app using React Native.",
            "Backend development with GraphQL and Rust.",
        ],
        techStack: ["React Native", "GraphQL", "Rust", "Apollo"],
        link: "#",
        category: "work",
    },
    {
        title: "Inventory Management System",
        role: "Freelance Full-Stack Developer",
        company: "B&E Computer Sales",
        date: "July 2020 - May 2021",
        description: ["Custom POS-like inventory management system."],
        techStack: ["React", "GraphQL", "PostgreSQL"],
        link: "#",
        category: "work",
    },
    {
        title: "Arduino-Based PCR Thermocycler",
        role: "Personal Project",
        company: "Personal",
        date: "N/A",
        description: [
            "Low-cost PCR thermocycler for DNA amplification.",
            "Precise heating/cooling cycles.",
        ],
        techStack: ["C++", "Arduino", "PID Control", "Embedded Systems"],
        link: "https://github.com/ky-os/Arduino-Thermocycler",
        logo: "https://www.google.com/s2/favicons?domain=github.com&sz=128",
        category: "personal",
    },
    {
        title: "Portfolio Website",
        role: "Personal Project",
        company: "Personal",
        date: "2025",
        description: [
            "This portfolio website built with Next.js and Tailwind CSS.",
            "Showcasing my projects and skills.",
        ],
        techStack: ["Next.js", "Tailwind CSS", "TypeScript"],
        link: "https://github.com/ky-os/portfolio",
        category: "personal",
    }
];

export default function ProjectShowcase() {
    const [activeTab, setActiveTab] = useState<"work" | "personal">("work");

    const filteredProjects = projects.filter(
        (project) => project.category === activeTab
    );

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-8 font-sans">
            <header className="mb-12 text-center relative z-10">
                <div className="absolute inset-0 -z-10 bg-blue-500/10 blur-3xl rounded-full transform -translate-y-1/2"></div>
                <h1 className="text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-purple-500">
                    Kyle Osunero
                </h1>
                <p className="text-xl text-gray-300 mb-6">
                    Software Engineer | Full-Stack Developer
                </p>
                <div className="flex justify-center gap-6 text-sm font-medium text-gray-400">
                    <a
                        href="mailto:kyle.osunero.21@gmail.com"
                        className="hover:text-blue-400 transition-colors"
                    >
                        Email
                    </a>
                    <span className="text-gray-600">|</span>
                    <Link
                        href="/linkedin"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-blue-400 transition-colors"
                    >
                        LinkedIn
                    </Link>
                    <span className="text-gray-600">|</span>
                    <Link
                        href="/github"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-blue-400 transition-colors"
                    >
                        GitHub
                    </Link>
                </div>
            </header>

            <div className="max-w-4xl mx-auto">
                {/* Tabs */}
                <div className="flex justify-center mb-12">
                    <div className="bg-gray-800/50 p-1 rounded-xl backdrop-blur-sm border border-gray-700/50 inline-flex">
                        <button
                            onClick={() => setActiveTab("work")}
                            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${activeTab === "work"
                                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                                : "text-gray-400 hover:text-white hover:bg-gray-700/50"
                                }`}
                        >
                            Work Experience
                        </button>
                        <button
                            onClick={() => setActiveTab("personal")}
                            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${activeTab === "personal"
                                ? "bg-purple-600 text-white shadow-lg shadow-purple-500/25"
                                : "text-gray-400 hover:text-white hover:bg-gray-700/50"
                                }`}
                        >
                            Personal Projects
                        </button>
                    </div>
                </div>

                <div className="relative border-l-2 border-gray-700/50 ml-4 md:ml-auto space-y-12">
                    {filteredProjects.map((project, index) => (
                        <div
                            key={`${project.title}-${index}`}
                            className="ml-6 relative group animate-in fade-in slide-in-from-bottom-4 duration-500"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {/* Timeline Dot */}
                            <span
                                className={`absolute -left-[35px] flex h-6 w-6 items-center justify-center rounded-full ring-4 ring-gray-900 transition-colors duration-300 ${activeTab === "work" ? "bg-blue-600" : "bg-purple-600"
                                    }`}
                            >
                                <svg
                                    className="h-3 w-3 text-white"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </span>

                            {/* Content Card */}
                            <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-700/50 hover:border-gray-600 hover:-translate-y-1">
                                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                                    <div className="flex items-start gap-4">
                                        {project.logo && (
                                            <div className="relative">
                                                <div className={`absolute inset-0 blur-lg opacity-20 rounded-full ${activeTab === 'work' ? 'bg-blue-500' : 'bg-purple-500'}`}></div>
                                                <Image
                                                    src={project.logo}
                                                    alt={`${project.title} logo`}
                                                    width={48}
                                                    height={48}
                                                    className="w-12 h-12 rounded-lg bg-white/5 p-1 object-contain relative z-10"
                                                />
                                            </div>
                                        )}
                                        <div>
                                            <h3 className={`text-xl font-bold ${activeTab === 'work' ? 'text-blue-400' : 'text-purple-400'}`}>
                                                {project.title}
                                            </h3>
                                            <p className="text-md font-semibold text-gray-300">
                                                {project.role}{" "}
                                                {project.company && <span className="text-gray-500">at {project.company}</span>}
                                            </p>
                                        </div>
                                    </div>
                                    <span className="text-xs font-medium text-gray-400 mt-2 md:mt-0 bg-gray-900/50 px-3 py-1 rounded-full border border-gray-700/50 whitespace-nowrap">
                                        {project.date}
                                    </span>
                                </div>

                                <ul className="space-y-2 mb-6">
                                    {project.description.map((desc, i) => (
                                        <li key={i} className="flex items-start text-gray-400 text-sm">
                                            <span className={`mr-2 mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${activeTab === 'work' ? 'bg-blue-500' : 'bg-purple-500'}`}></span>
                                            {desc}
                                        </li>
                                    ))}
                                </ul>

                                <div className="mb-6">
                                    <div className="flex flex-wrap gap-2">
                                        {project.techStack.map((tech, i) => (
                                            <span
                                                key={i}
                                                className="px-2.5 py-1 text-xs font-medium bg-gray-700/30 text-gray-300 rounded-md border border-gray-700/50 hover:bg-gray-700/50 transition-colors"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {project.link && project.link !== "#" && (
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`inline-flex items-center text-sm font-medium ${activeTab === 'work'
                                            ? 'text-blue-400 hover:text-blue-300'
                                            : 'text-purple-400 hover:text-purple-300'
                                            } transition-colors group/link`}
                                    >
                                        View Project{" "}
                                        <svg
                                            className="w-4 h-4 ml-1 transform group-hover/link:translate-x-1 transition-transform"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                            ></path>
                                        </svg>
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
