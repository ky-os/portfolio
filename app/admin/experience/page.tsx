import React from "react";
import { preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { ExperienceList } from "@/app/components/admin/ExperienceList";
import { SectionHeader } from "@/app/components/ui/SectionHeader";

import { getAuthToken } from '@/lib/get-auth-token';

export default async function ExperiencePage() {
    const token = await getAuthToken();

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

