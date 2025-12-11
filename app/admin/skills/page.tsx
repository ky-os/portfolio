import React from "react";
import { SkillList } from "@/app/components/admin/SkillList";
import { SectionHeader } from "@/app/components/ui/SectionHeader";

export default function SkillsPage() {
    return (
        <div>
            <SectionHeader
                title="Skills"
                subtitle="Manage technical skills and tools."
                className="mb-8"
            />
            <SkillList />
        </div>
    );
}

