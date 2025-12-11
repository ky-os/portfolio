import React from "react";
import { ExperienceList } from "@/app/components/admin/ExperienceList";
import { SectionHeader } from "@/app/components/ui/SectionHeader";

export default function ExperiencePage() {
    return (
        <div>
            <SectionHeader
                title="Experience"
                subtitle="Update your work history and career timeline."
                className="mb-8"
            />
            <ExperienceList />
        </div>
    );
}

