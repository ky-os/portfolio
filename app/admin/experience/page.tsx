import React from "react";
import { preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { ExperienceList } from "@/app/components/admin/ExperienceList";
import { SectionHeader } from "@/app/components/ui/SectionHeader";

export default async function ExperiencePage() {
    const preloadedExperiences = await preloadQuery(api.queries.getExperiences);

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

