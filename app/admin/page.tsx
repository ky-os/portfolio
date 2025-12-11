"use client";

import React from "react";
import Link from "next/link";
import { Briefcase, Code, Bookmark, Layers, Shield } from "lucide-react";
import { Card, CardContent } from "../components/ui/Card";
import { SectionHeader } from "../components/ui/SectionHeader";

export default function AdminDashboard() {
    return (
        <div>
            <SectionHeader
                title="Welcome back"
                subtitle="Select a section to manage your content."
                className="mb-8"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Link href="/admin/projects" className="block group">
                    <Card className="h-full border-gray-800 hover:border-blue-500/50 transition-colors">
                        <CardContent className="flex flex-col items-start gap-4">
                            <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400 group-hover:scale-110 transition-transform duration-300">
                                <Briefcase size={28} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">Projects</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">Manage your portfolio projects and case studies.</p>
                            </div>
                        </CardContent>
                    </Card>
                </Link>

                <Link href="/admin/experience" className="block group">
                    <Card className="h-full border-gray-800 hover:border-purple-500/50 transition-colors" delay={0.1}>
                        <CardContent className="flex flex-col items-start gap-4">
                            <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400 group-hover:scale-110 transition-transform duration-300">
                                <Layers size={28} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-purple-400 transition-colors">Experience</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">Update your work history and career timeline.</p>
                            </div>
                        </CardContent>
                    </Card>
                </Link>

                <Link href="/admin/bookmarks" className="block group">
                    <Card className="h-full border-gray-800 hover:border-green-500/50 transition-colors" delay={0.2}>
                        <CardContent className="flex flex-col items-start gap-4">
                            <div className="p-3 bg-green-500/10 rounded-xl text-green-400 group-hover:scale-110 transition-transform duration-300">
                                <Bookmark size={28} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-green-400 transition-colors">Bookmarks</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">Curate your reading list and resources.</p>
                            </div>
                        </CardContent>
                    </Card>
                </Link>

                <Link href="/admin/skills" className="block group">
                    <Card className="h-full border-gray-800 hover:border-orange-500/50 transition-colors" delay={0.3}>
                        <CardContent className="flex flex-col items-start gap-4">
                            <div className="p-3 bg-orange-500/10 rounded-xl text-orange-400 group-hover:scale-110 transition-transform duration-300">
                                <Code size={28} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-orange-400 transition-colors">Skills</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">Manage technical skills and tools.</p>
                            </div>
                        </CardContent>
                    </Card>
                </Link>

                <Link href="/admin/access" className="block group">
                    <Card className="h-full border-gray-800 hover:border-red-500/50 transition-colors" delay={0.3}>
                        <CardContent className="flex flex-col items-start gap-4">
                            <div className="p-3 bg-red-500/10 rounded-xl text-red-400 group-hover:scale-110 transition-transform duration-300">
                                <Shield size={28} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-red-400 transition-colors">Access Control</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">Manage whitelisted users and permissions.</p>
                            </div>
                        </CardContent>
                    </Card>
                </Link>
            </div>
        </div>
    );
}

