import React from "react";
import { ProjectList } from "@/app/components/admin/ProjectList";

export default function ProjectsPage() {
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Projects</h1>
                <p className="text-gray-400">Manage your portfolio projects and case studies.</p>
            </div>
            <ProjectList />
        </div>
    );
}

