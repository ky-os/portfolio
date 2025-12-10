import React from "react";
import Image from "next/image";
import { Card, CardContent } from "./ui/Card";
import { SectionHeader } from "./ui/SectionHeader";
import { ExternalLink } from "lucide-react";

interface Company {
    name: string;
    role: string;
    period: string;
    logo: string | null;
    url: string;
    description: string;
    initials?: string;
}

const companies: Company[] = [
    {
        name: "SolX Technologies Inc.",
        role: "Software Engineer",
        period: "2023 - Present",
        logo: "https://www.google.com/s2/favicons?domain=solx.ph&sz=128",
        url: "https://solx.ph",
        description: "Leading backend development and system architecture."
    },
    {
        name: "StackTrek",
        role: "Full Stack Developer",
        period: "2022 - 2023",
        logo: "https://www.google.com/s2/favicons?domain=stacktrek.com&sz=128",
        url: "https://stacktrek.com",
        description: "Developed scalable web applications and mentored junior devs."
    },
    {
        name: "ztock",
        role: "Frontend Developer",
        period: "2021 - 2022",
        logo: null,
        url: "#",
        description: "Built responsive user interfaces for financial data visualization."
    },
    {
        name: "B&E Computer Sales",
        role: "Full Stack Developer",
        period: "2020 - 2021",
        logo: null,
        initials: "B&E",
        url: "#",
        description: "Managed hardware and software solutions for enterprise clients."
    }
];

export default function ProfessionalExperience() {
    return (
        <section className="max-w-5xl mx-auto px-4 mb-24">
            <SectionHeader title="Professional Experience" subtitle="My journey through the tech industry." />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {companies.map((company, index) => (
                    <Card key={index} delay={index * 0.1} className="group">
                        <CardContent className="flex items-start gap-4">
                            <div className="shrink-0">
                                {company.logo ? (
                                    <div className="w-16 h-16 rounded-xl bg-white/5 p-2 border border-white/10 group-hover:border-blue-500/30 group-hover:bg-blue-500/10 transition-colors">
                                        <Image
                                            src={company.logo}
                                            alt={company.name}
                                            width={64}
                                            height={64}
                                            className="object-contain w-full h-full"
                                            unoptimized
                                        />
                                    </div>
                                ) : (
                                    <div className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 font-bold text-gray-400 text-xl group-hover:border-blue-500/30 group-hover:bg-blue-500/10 group-hover:text-blue-400 transition-colors">
                                        {company.initials || company.name.substring(0, 2).toUpperCase()}
                                    </div>
                                )}
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                    <h3 className="text-lg font-bold text-white truncate group-hover:text-blue-400 transition-colors">
                                        {company.name}
                                    </h3>
                                    {company.url !== "#" && (
                                        <a
                                            href={company.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-500 hover:text-white transition-colors"
                                        >
                                            <ExternalLink size={16} />
                                        </a>
                                    )}
                                </div>
                                <p className="text-sm text-blue-400 font-medium mb-1">{company.role}</p>
                                <p className="text-xs text-gray-500 font-mono mb-3">{company.period}</p>
                                <p className="text-sm text-gray-400 line-clamp-2">{company.description}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
}
