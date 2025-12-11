import React from "react";
import { ProjectList } from "@/app/components/admin/ProjectList";
import { SectionHeader } from "@/app/components/ui/SectionHeader";

export default function ProjectsPage() {
    return (
        <div>
            <SectionHeader
                title="Projects"
                subtitle="Manage your portfolio projects and case studies."
                className="mb-8"
            />
            <ProjectList />
        </div>
    );
}

