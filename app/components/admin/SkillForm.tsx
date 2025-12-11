"use client";

import React, { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { X, Plus, Trash } from "lucide-react";
import { Card } from "../ui/Card";

interface SkillFormProps {
    initialData: Doc<"skills"> | null;
    onClose: () => void;
}

export function SkillForm({ initialData, onClose }: SkillFormProps) {
    const addSkill = useMutation(api.mutations.addSkill);
    const updateSkill = useMutation(api.mutations.updateSkill);

    const [formData, setFormData] = useState({
        category: initialData?.category || "",
        items: initialData?.items || [{ name: "", icon: "" }],
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const cleanItems = formData.items.filter(i => i.name.trim() !== "");

        const skillData = {
            ...formData,
            items: cleanItems,
        };

        try {
            if (initialData) {
                await updateSkill({
                    id: initialData._id,
                    ...skillData,
                });
            } else {
                await addSkill(skillData);
            }
            onClose();
        } catch (error) {
            console.error("Failed to save skill:", error);
            alert("Failed to save skill. Please check the console for details.");
        }
    };

    const handleArrayChange = (
        index: number,
        field: "name" | "icon",
        value: string
    ) => {
        const newArray = [...formData.items];
        newArray[index] = { ...newArray[index], [field]: value };
        setFormData({ ...formData, items: newArray });
    };

    const addArrayItem = () => {
        setFormData({ ...formData, items: [...formData.items, { name: "", icon: "" }] });
    };

    const removeArrayItem = (index: number) => {
        const newArray = [...formData.items];
        newArray.splice(index, 1);
        setFormData({ ...formData, items: newArray });
    };

    return (
        <Card hoverEffect={false} className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">
                    {initialData ? "Edit Skill Category" : "New Skill Category"}
                </h2>
                <button onClick={onClose} className="text-gray-400 hover:text-white">
                    <X size={24} />
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Category Name</label>
                    <input
                        type="text"
                        required
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        placeholder="e.g. Languages, Frameworks"
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Items</label>
                    <div className="space-y-3">
                        {formData.items.map((item, index) => (
                            <div key={index} className="flex items-center gap-2 bg-gray-900 border border-gray-700 rounded-lg p-2">
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={item.name}
                                    onChange={(e) => handleArrayChange(index, "name", e.target.value)}
                                    className="bg-transparent border border-gray-700 rounded px-2 py-1 text-white focus:outline-none w-1/3 text-sm"
                                />
                                <input
                                    type="text"
                                    placeholder="Icon URL"
                                    value={item.icon}
                                    onChange={(e) => handleArrayChange(index, "icon", e.target.value)}
                                    className="bg-transparent border border-gray-700 rounded px-2 py-1 text-white focus:outline-none flex-1 text-sm"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeArrayItem(index)}
                                    className="p-1 text-gray-400 hover:text-red-400"
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addArrayItem}
                            className="px-3 py-1 text-sm border border-dashed border-gray-600 text-gray-400 rounded-lg hover:border-blue-500 hover:text-blue-400 transition-colors"
                        >
                            + Add Item
                        </button>
                    </div>
                </div>

                <div className="flex justify-end gap-4 pt-4 border-t border-gray-700">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
                    >
                        Save Skills
                    </button>
                </div>
            </form>
        </Card>
    );
}

