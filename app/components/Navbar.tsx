"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

export default function Navbar() {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
        setScrolled(latest > 50);
    });

    return (
        <motion.nav
            variants={{
                visible: { y: 0 },
                hidden: { y: "-100%" },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? "bg-gray-950/80 backdrop-blur-md border-b border-gray-800 py-4"
                    : "bg-transparent py-6"
                }`}
        >
            <div className="max-w-5xl mx-auto px-4 flex items-center justify-between">
                {/* Logo / Home */}
                <Link
                    href="/"
                    className="text-xl font-bold text-white tracking-tight hover:text-blue-400 transition-colors"
                >
                    KO<span className="text-blue-500">.</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    <NavLink href="/process">Process</NavLink>
                    <NavLink href="/bookmarks">Bookmarks</NavLink>
                    <NavLink href="/api/resume/pdf" external>Resume</NavLink>
                </div>

                {/* Mobile Nav (Simple) */}
                <div className="flex md:hidden items-center gap-4">
                    <Link href="/process" className="text-sm text-gray-400 hover:text-white">Process</Link>
                    <Link href="/bookmarks" className="text-sm text-gray-400 hover:text-white">Bookmarks</Link>
                    <Link href="/api/resume/pdf" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white">Resume</Link>
                </div>
            </div>
        </motion.nav>
    );
}

function NavLink({ href, children, external = false }: { href: string; children: React.ReactNode; external?: boolean }) {
    const props = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
    return (
        <Link
            href={href}
            {...props}
            className="text-sm font-medium text-gray-400 hover:text-white transition-colors relative group"
        >
            {children}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full" />
        </Link>
    );
}
