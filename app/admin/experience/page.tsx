import React from "react";
import { fetchQuery, preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { ExperienceList } from "@/app/components/admin/ExperienceList";
import { SectionHeader } from "@/app/components/ui/SectionHeader";

import {
    convexAuthNextjsToken,
    isAuthenticatedNextjs,
} from "@convex-dev/auth/nextjs/server";
import { redirect } from "next/navigation";

export default async function ExperiencePage() {
    const isAuthenticated = await isAuthenticatedNextjs();
    if (!isAuthenticated) redirect("/admin");

    const token = await convexAuthNextjsToken();
    const isAdmin = await fetchQuery(api.queries.isAdmin, {}, { token });
    if (!isAdmin) redirect("/intruder");

    const preloadedExperiences = await preloadQuery(api.queries.getExperiences, undefined, { token });

    return (
        <div>
            <SectionHeader
                title="Experience"
                subtitle="Update your work history and career timeline."
                className="mb-8"
            />
            <ExperienceList preloadedExperiences={preloadedExperiences} />
        </div>
    );
}

