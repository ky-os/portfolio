import React from "react";
import { preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { SkillList } from "@/app/components/admin/SkillList";
import { SectionHeader } from "@/app/components/ui/SectionHeader";

import { getAuthToken } from '@/lib/get-auth-token';

export default async function SkillsPage() {
    const token = await getAuthToken();

    const preloadedSkills = await preloadQuery(api.queries.getSkills, undefined, { token });

    return (
        <div>
            <SectionHeader
                title="Skills"
                subtitle="Manage technical skills and tools."
                className="mb-8"
            />
            <SkillList preloadedSkills={preloadedSkills} />
        </div>
    );
}

