import React from "react";
import Image from "next/image";

interface FeaturedCompanyProps {
    name: string;
    role: string;
    period: string;
    description: string;
    logo: string;
    link: string;
    highlights: string[];
    status?: string;
}

export default function FeaturedCompany({
    name,
    role,
    period,
    description,
    logo,
    link,
    highlights,
    status
}: FeaturedCompanyProps) {
    return (
        <div className="mb-16 relative group animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
            <div className="absolute -inset-0.5 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-gray-900/90 backdrop-blur-xl ring-1 ring-white/10 rounded-xl p-6 md:p-8 overflow-hidden">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>

                <div className="relative flex flex-col md:flex-row gap-8 items-start">
                    <div className="shrink-0 mx-auto md:mx-0">
                        <div className="w-24 h-24 rounded-2xl bg-white/5 p-4 flex items-center justify-center border border-white/10 shadow-xl backdrop-blur-sm">
                            <Image
                                src={logo}
                                alt={`${name} logo`}
                                width={80}
                                height={80}
                                className="object-contain w-full h-full"
                            />
                        </div>
                    </div>
                    <div className="flex-1 w-full">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
                            <div className="text-center md:text-left">
                                <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                                    <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{name}</h2>
                                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold border border-amber-500/20 uppercase tracking-wider shadow-[0_0_10px_rgba(245,158,11,0.2)]">
                                        Featured
                                    </span>
                                </div>
                                <p className="text-lg text-blue-400 font-medium">{role}</p>
                            </div>
                            <div className="flex flex-col items-center md:items-end gap-2">
                                <span className="text-sm text-gray-400 font-mono bg-gray-800/50 px-4 py-1.5 rounded-full border border-gray-700/50 shadow-inner">
                                    {period}
                                </span>
                                {status && (
                                    <span className="text-xs font-medium text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20 flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                        {status}
                                    </span>
                                )}
                            </div>
                        </div>

                        <p className="text-gray-300 mb-8 leading-relaxed text-lg border-l-4 border-blue-500/30 pl-4 italic">
                            {description}
                        </p>

                        <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 mb-8">
                            {highlights.map((highlight, i) => (
                                <div key={i} className="flex items-start gap-3 group/item">
                                    <div className="mt-2 w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0 group-hover/item:scale-150 transition-transform duration-300 shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
                                    <span className="text-gray-400 group-hover/item:text-gray-200 transition-colors">{highlight}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center justify-center md:justify-start gap-4 pt-6 border-t border-gray-800/50">
                            <a
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5"
                            >
                                Visit Company
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
