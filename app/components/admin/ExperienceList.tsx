"use client";

import React, { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { Edit, Trash2, Plus } from "lucide-react";
import { ExperienceForm } from "./ExperienceForm";
import { Card, CardContent } from "../ui/Card";

export function ExperienceList() {
    const experiences = useQuery(api.queries.getExperiences);
    const deleteExperience = useMutation(api.mutations.deleteExperience);
    const [editingExperience, setEditingExperience] = useState<Doc<"experiences"> | null>(null);
    const [isCreating, setIsCreating] = useState(false);

    if (!experiences) {
        return <div className="text-gray-400 animate-pulse">Loading experiences...</div>;
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
            <div className="flex justify-end mb-6">
                <button
                    onClick={() => setIsCreating(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all shadow-lg shadow-blue-500/20 font-medium"
                >
                    <Plus size={18} />
                    Add Experience
                </button>
            </div>

            <div className="grid gap-4">
                {experiences.map((exp, index) => (
                    <Card key={exp._id} delay={index * 0.05} className="group">
                        <CardContent className="flex justify-between items-center p-5">
                            <div>
                                <h3 className="font-bold text-white text-lg group-hover:text-blue-400 transition-colors">{exp.name}</h3>
                                <p className="text-sm text-gray-400 mt-1">{exp.role} • {exp.period}</p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setEditingExperience(exp)}
                                    className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                                    title="Edit"
                                >
                                    <Edit size={18} />
                                </button>
                                <button
                                    onClick={() => handleDelete(exp._id)}
                                    className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                    title="Delete"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {experiences.length === 0 && (
                    <div className="text-center py-16 text-gray-500 bg-gray-900/30 rounded-xl border border-gray-800 border-dashed">
                        <p>No experience entries found.</p>
                        <button
                            onClick={() => setIsCreating(true)}
                            className="text-blue-400 hover:text-blue-300 mt-2 font-medium"
                        >
                            Create your first entry
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

