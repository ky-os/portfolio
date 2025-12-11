"use client";

import React, { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { Edit, Trash2, Plus } from "lucide-react";
import { ExperienceForm } from "./ExperienceForm";

export function ExperienceList() {
    const experiences = useQuery(api.queries.getExperiences);
    const deleteExperience = useMutation(api.mutations.deleteExperience);
    const [editingExperience, setEditingExperience] = useState<Doc<"experiences"> | null>(null);
    const [isCreating, setIsCreating] = useState(false);

    if (!experiences) {
        return <div className="text-gray-400">Loading experiences...</div>;
    }

    const handleDelete = async (id: Doc<"experiences">["_id"]) => {
        if (confirm("Are you sure you want to delete this experience?")) {
            await deleteExperience({ id });
        }
    };

    if (isCreating || editingExperience) {
        return (
            <ExperienceForm
                initialData={editingExperience}
                onClose={() => {
                    setIsCreating(false);
                    setEditingExperience(null);
                }}
            />
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Experience</h2>
                <button
                    onClick={() => setIsCreating(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                    <Plus size={18} />
                    Add Experience
                </button>
            </div>

            <div className="grid gap-4">
                {experiences.map((exp) => (
                    <div key={exp._id} className="p-4 bg-gray-800 rounded-xl border border-gray-700 flex justify-between items-center">
                        <div>
                            <h3 className="font-bold text-white">{exp.name}</h3>
                            <p className="text-sm text-gray-400">{exp.role} • {exp.period}</p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setEditingExperience(exp)}
                                className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                            >
                                <Edit size={18} />
                            </button>
                            <button
                                onClick={() => handleDelete(exp._id)}
                                className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}

                {experiences.length === 0 && (
                    <div className="text-center py-12 text-gray-500 bg-gray-800/50 rounded-xl border border-gray-800 border-dashed">
                        No experience entries found. Create one to get started.
                    </div>
                )}
            </div>
        </div>
    );
}

