"use client";

import React, { useState, useEffect } from "react";
import { useMutation } from "convex/react";
import { Preloaded, usePreloadedQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { Edit, Trash2, Plus, GripVertical } from "lucide-react";
import { Reorder } from "framer-motion";
import { revalidateHome } from "@/app/actions";
import { SkillForm } from "./SkillForm";
import { Card, CardContent } from "../ui/Card";

interface SkillListProps {
    preloadedSkills: Preloaded<typeof api.queries.getSkills>;
}

export function SkillList({ preloadedSkills }: SkillListProps) {
    const skills = usePreloadedQuery(preloadedSkills);
    const deleteSkill = useMutation(api.mutations.deleteSkill);
    const reorderSkills = useMutation(api.mutations.reorderSkills);
    const [editingSkill, setEditingSkill] = useState<Doc<"skills"> | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [items, setItems] = useState(skills);

    useEffect(() => {
        setItems(skills);
    }, [skills]);

    const handleDelete = async (id: Doc<"skills">["_id"]) => {
        if (confirm("Are you sure you want to delete this skill category?")) {
            await deleteSkill({ id });
            await revalidateHome();
        }
    };

    const handleDragEnd = async () => {
        const updates = items.map((skill, index) => ({
            id: skill._id,
            order: items.length - index
        }));
        await reorderSkills({ items: updates });
        await revalidateHome();
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
            <div className="flex justify-end mb-6">
                <button
                    onClick={() => setIsCreating(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all shadow-lg shadow-blue-500/20 font-medium"
                >
                    <Plus size={18} />
                    Add Skill Category
                </button>
            </div>

            <Reorder.Group axis="y" values={items} onReorder={setItems} className="flex flex-col gap-4">
                {items.map((skill) => (
                    <Reorder.Item key={skill._id} value={skill} onDragEnd={handleDragEnd}>
                        <Card delay={0} className="group relative">
                            <CardContent className="flex justify-between items-center p-5 pl-12">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing text-gray-600 hover:text-gray-400 p-2">
                                    <GripVertical size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white text-lg capitalize group-hover:text-blue-400 transition-colors">{skill.category}</h3>
                                    <p className="text-sm text-gray-400 mt-1">{skill.items.length} items</p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setEditingSkill(skill)}
                                        className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                                        title="Edit"
                                    >
                                        <Edit size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(skill._id)}
                                        className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                        title="Delete"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </CardContent>
                        </Card>
                    </Reorder.Item>
                ))}

                {items.length === 0 && (
                    <div className="text-center py-16 text-gray-500 bg-gray-900/30 rounded-xl border border-gray-800 border-dashed">
                        <p>No skills found.</p>
                        <button
                            onClick={() => setIsCreating(true)}
                            className="text-blue-400 hover:text-blue-300 mt-2 font-medium"
                        >
                            Create your first skill category
                        </button>
                    </div>
                )}
            </Reorder.Group>
        </div>
    );
}

