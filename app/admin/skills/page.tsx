import React from "react";
import { fetchQuery, preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { SkillList } from "@/app/components/admin/SkillList";
import { SectionHeader } from "@/app/components/ui/SectionHeader";

import {
    convexAuthNextjsToken,
    isAuthenticatedNextjs,
} from "@convex-dev/auth/nextjs/server";
import { redirect } from "next/navigation";

export default async function SkillsPage() {
    const isAuthenticated = await isAuthenticatedNextjs();
    if (!isAuthenticated) redirect("/admin");

    const token = await convexAuthNextjsToken();
    const isAdmin = await fetchQuery(api.queries.isAdmin, {}, { token });
    if (!isAdmin) redirect("/intruder");

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

