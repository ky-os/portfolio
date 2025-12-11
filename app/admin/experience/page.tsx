import React from "react";
import { ExperienceList } from "@/app/components/admin/ExperienceList";

export default function ExperiencePage() {
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Experience</h1>
                <p className="text-gray-400">Update your work history and career timeline.</p>
            </div>
            <ExperienceList />
        </div>
    );
}

