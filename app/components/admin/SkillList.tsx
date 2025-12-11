"use client";

import React, { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { Edit, Trash2, Plus } from "lucide-react";
import { SkillForm } from "./SkillForm";

export function SkillList() {
    const skills = useQuery(api.queries.getSkills);
    const deleteSkill = useMutation(api.mutations.deleteSkill);
    const [editingSkill, setEditingSkill] = useState<Doc<"skills"> | null>(null);
    const [isCreating, setIsCreating] = useState(false);

    if (!skills) {
        return <div className="text-gray-400">Loading skills...</div>;
    }

    const handleDelete = async (id: Doc<"skills">["_id"]) => {
        if (confirm("Are you sure you want to delete this skill category?")) {
            await deleteSkill({ id });
        }
    };

    if (isCreating || editingSkill) {
        return (
            <SkillForm
                initialData={editingSkill}
                onClose={() => {
                    setIsCreating(false);
                    setEditingSkill(null);
                }}
            />
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Skills</h2>
                <button
                    onClick={() => setIsCreating(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                    <Plus size={18} />
                    Add Skill Category
                </button>
            </div>

            <div className="grid gap-4">
                {skills.map((skill) => (
                    <div key={skill._id} className="p-4 bg-gray-800 rounded-xl border border-gray-700 flex justify-between items-center">
                        <div>
                            <h3 className="font-bold text-white capitalize">{skill.category}</h3>
                            <p className="text-sm text-gray-400">{skill.items.length} items</p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setEditingSkill(skill)}
                                className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                            >
                                <Edit size={18} />
                            </button>
                            <button
                                onClick={() => handleDelete(skill._id)}
                                className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}

                {skills.length === 0 && (
                    <div className="text-center py-12 text-gray-500 bg-gray-800/50 rounded-xl border border-gray-800 border-dashed">
                        No skills found. Create one to get started.
                    </div>
                )}
            </div>
        </div>
    );
}

