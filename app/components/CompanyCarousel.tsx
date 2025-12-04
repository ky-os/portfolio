"use client";

import React from "react";
import Image from "next/image";

const companies = [
    {
        name: "SolX Technologies Inc.",
        logo: "https://www.google.com/s2/favicons?domain=solx.ph&sz=128",
        url: "https://solx.ph"
    },
    {
        name: "StackTrek",
        logo: "https://www.google.com/s2/favicons?domain=stacktrek.com&sz=128",
        url: "https://stacktrek.com"
    },
    {
        name: "ztock",
        logo: null,
        url: "#"
    },
    {
        name: "B&E Computer Sales",
        logo: null,
        url: "#"
    }
];

export default function CompanyCarousel() {
    return (
        <div className="w-full py-10 overflow-hidden border-y border-gray-800/50 bg-gray-900/30 backdrop-blur-sm mb-16">
            <div className="max-w-7xl mx-auto px-4 md:px-8 relative">
                <div className="text-center mb-8">
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                        Professional Experience
                    </p>
                </div>

                <div className="relative flex overflow-hidden group mask-linear-fade">
                    <div className="flex animate-marquee min-w-full shrink-0 justify-around gap-12 md:gap-24 px-6 md:px-12">
                        {companies.map((company, index) => (
                            <CompanyItem key={`${company.name}-1-${index}`} company={company} />
                        ))}
                    </div>
                    <div className="flex animate-marquee min-w-full shrink-0 justify-around gap-12 md:gap-24 px-6 md:px-12">
                        {companies.map((company, index) => (
                            <CompanyItem key={`${company.name}-2-${index}`} company={company} />
                        ))}
                    </div>
                </div>

                {/* Fade edges */}
                <div className="absolute inset-y-0 left-0 w-20 bg-linear-to-r from-gray-900 to-transparent z-10 pointer-events-none"></div>
                <div className="absolute inset-y-0 right-0 w-20 bg-linear-to-l from-gray-900 to-transparent z-10 pointer-events-none"></div>
            </div>

            <style jsx>{`
                .animate-marquee {
                    animation: marquee 30s linear infinite;
                }
                @keyframes marquee {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-100%); }
                }
                /* Pause on hover */
                .group:hover .animate-marquee {
                    animation-play-state: paused;
                }
            `}</style>
        </div>
    );
}

function CompanyItem({ company }: { company: typeof companies[0] }) {
    return (
        <a
            href={company.url}
            target={company.url !== "#" ? "_blank" : undefined}
            rel={company.url !== "#" ? "noopener noreferrer" : undefined}
            className={`flex items-center gap-4 opacity-50 hover:opacity-100 transition-all duration-300 grayscale hover:grayscale-0 group/item ${company.url === "#" ? "cursor-default" : "cursor-pointer"}`}
        >
            {company.logo ? (
                <div className="relative w-12 h-12 rounded-xl bg-white/5 p-2 border border-white/10 group-hover/item:border-blue-500/30 group-hover/item:bg-blue-500/10 transition-colors">
                    <Image
                        src={company.logo}
                        alt={company.name}
                        width={48}
                        height={48}
                        className="object-contain w-full h-full"
                    />
                </div>
            ) : (
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 font-bold text-gray-400 text-sm group-hover/item:border-blue-500/30 group-hover/item:bg-blue-500/10 group-hover/item:text-blue-400 transition-colors">
                    {company.name.substring(0, 2).toUpperCase()}
                </div>
            )}
            <span className="text-xl font-bold text-gray-300 group-hover/item:text-white transition-colors whitespace-nowrap">
                {company.name}
            </span>
        </a>
    );
}
