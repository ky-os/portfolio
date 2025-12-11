"use client";

import React from "react";
import Link from "next/link";
import { Briefcase, Code, Bookmark, Layers } from "lucide-react";

export default function AdminDashboard() {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Welcome back</h2>
            <p className="text-gray-400">Select a section to manage your content.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                <Link href="/admin/projects" className="block">
                    <div className="p-6 bg-gray-800 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-colors cursor-pointer h-full">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                                <Briefcase size={24} />
                            </div>
                            <h3 className="text-lg font-bold">Projects</h3>
                        </div>
                        <p className="text-gray-400 text-sm">Manage your portfolio projects and case studies.</p>
                    </div>
                </Link>

                <Link href="/admin/experience" className="block">
                    <div className="p-6 bg-gray-800 rounded-xl border border-gray-700 hover:border-purple-500/50 transition-colors cursor-pointer h-full">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                                <Layers size={24} />
                            </div>
                            <h3 className="text-lg font-bold">Experience</h3>
                        </div>
                        <p className="text-gray-400 text-sm">Update your work history and career timeline.</p>
                    </div>
                </Link>

                <Link href="/admin/bookmarks" className="block">
                    <div className="p-6 bg-gray-800 rounded-xl border border-gray-700 hover:border-green-500/50 transition-colors cursor-pointer h-full">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-green-500/10 rounded-lg text-green-400">
                                <Bookmark size={24} />
                            </div>
                            <h3 className="text-lg font-bold">Bookmarks</h3>
                        </div>
                        <p className="text-gray-400 text-sm">Curate your reading list and resources.</p>
                    </div>
                </Link>

                <Link href="/admin/skills" className="block">
                    <div className="p-6 bg-gray-800 rounded-xl border border-gray-700 hover:border-orange-500/50 transition-colors cursor-pointer h-full">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-orange-500/10 rounded-lg text-orange-400">
                                <Code size={24} />
                            </div>
                            <h3 className="text-lg font-bold">Skills</h3>
                        </div>
                        <p className="text-gray-400 text-sm">Manage technical skills and tools.</p>
                    </div>
                </Link>
            </div>
        </div>
    );
}

