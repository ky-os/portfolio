"use client";

import React, { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { Edit, Trash2, Plus, GripVertical } from "lucide-react";
import { ExperienceForm } from "./ExperienceForm";
import { Card, CardContent } from "../ui/Card";
import { Reorder } from "framer-motion";
import { revalidateHome } from "@/app/actions";

export function ExperienceList() {
    const experiences = useQuery(api.queries.getExperiences);
    const deleteExperience = useMutation(api.mutations.deleteExperience);
    const reorderExperiences = useMutation(api.mutations.reorderExperiences);
    const [editingExperience, setEditingExperience] = useState<Doc<"experiences"> | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [items, setItems] = useState<Doc<"experiences">[]>([]);

    React.useEffect(() => {
        if (experiences) {
            setItems(experiences);
        }
    }, [experiences]);

    if (!experiences) {
        return <div className="text-gray-400 animate-pulse">Loading experiences...</div>;
    }

    const handleDelete = async (id: Doc<"experiences">["_id"]) => {
        if (confirm("Are you sure you want to delete this experience?")) {
            await deleteExperience({ id });
            await revalidateHome();
        }
    };

    const handleDragEnd = async () => {
        const updates = items.map((exp, index) => ({
            id: exp._id,
            order: items.length - index
        }));
        await reorderExperiences({ items: updates });
        await revalidateHome();
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

            <Reorder.Group axis="y" values={items} onReorder={setItems} className="flex flex-col gap-4">
                {items.map((exp) => (
                    <Reorder.Item key={exp._id} value={exp} onDragEnd={handleDragEnd}>
                        <Card delay={0} className="group relative">
                            <CardContent className="flex justify-between items-center p-5 pl-12">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing text-gray-600 hover:text-gray-400 p-2">
                                    <GripVertical size={20} />
                                </div>
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
                    </Reorder.Item>
                ))}

                {items.length === 0 && (
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
            </Reorder.Group>
        </div>
    );
}

