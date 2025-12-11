import React from "react";
import { preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { ProjectList } from "@/app/components/admin/ProjectList";
import { SectionHeader } from "@/app/components/ui/SectionHeader";

import { getAuthToken } from '@/lib/get-auth-token';

export default async function ProjectsPage() {
    const token = await getAuthToken();

    const preloadedProjects = await preloadQuery(api.queries.getProjects, undefined, { token });

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

