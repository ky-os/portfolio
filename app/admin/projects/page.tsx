import React from "react";
import { preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { ProjectList } from "@/app/components/admin/ProjectList";
import { SectionHeader } from "@/app/components/ui/SectionHeader";

export default async function ProjectsPage() {
    const preloadedProjects = await preloadQuery(api.queries.getProjects);

    return (
        <div>
            <SectionHeader
                title="Projects"
                subtitle="Manage your portfolio projects and case studies."
                className="mb-8"
            />
            <ProjectList preloadedProjects={preloadedProjects} />
        </div>
    );
}

