import React from "react";
import { fetchQuery, preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { ProjectList } from "@/app/components/admin/ProjectList";
import { SectionHeader } from "@/app/components/ui/SectionHeader";

import {
    convexAuthNextjsToken,
    isAuthenticatedNextjs,
} from "@convex-dev/auth/nextjs/server";
import { redirect } from "next/navigation";

export default async function ProjectsPage() {
    const isAuthenticated = await isAuthenticatedNextjs();
    if (!isAuthenticated) redirect("/admin");

    const token = await convexAuthNextjsToken();
    const isAdmin = await fetchQuery(api.queries.isAdmin, {}, { token });
    if (!isAdmin) redirect("/intruder");

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

