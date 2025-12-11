import React from "react";
import { SkillList } from "@/app/components/admin/SkillList";

export default function SkillsPage() {
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Skills</h1>
                <p className="text-gray-400">Manage technical skills and tools.</p>
            </div>
            <SkillList />
        </div>
    );
}

