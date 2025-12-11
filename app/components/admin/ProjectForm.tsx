"use client";

import React, { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { X, Plus, Trash } from "lucide-react";
import { Card } from "../ui/Card";

interface ProjectFormProps {
    initialData: Doc<"projects"> | null;
    onClose: () => void;
}

export function ProjectForm({ initialData, onClose }: ProjectFormProps) {
    const addProject = useMutation(api.mutations.addProject);
    const updateProject = useMutation(api.mutations.updateProject);
    const experiences = useQuery(api.queries.getExperiences);

    const [formData, setFormData] = useState({
        title: initialData?.title || "",
        role: initialData?.role || "",
        company: initialData?.company || "",
        experienceId: initialData?.experienceId || undefined,
        date: initialData?.date || "",
        description: initialData?.description || [""],
        techStack: initialData?.techStack || [""],
        link: initialData?.link || "",
        logo: initialData?.logo || "",
        category: initialData?.category || "work",
        xp: initialData?.xp || 1000,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Filter out empty strings from arrays
        const cleanDescription = formData.description.filter(d => d.trim() !== "");
        const cleanTechStack = formData.techStack.filter(t => t.trim() !== "");

        const projectData = {
            ...formData,
            description: cleanDescription,
            techStack: cleanTechStack,
            category: formData.category as "work" | "personal",
        };

        try {
            if (initialData) {
                await updateProject({
                    id: initialData._id,
                    ...projectData,
                });
            } else {
                await addProject(projectData);
            }
            onClose();
        } catch (error) {
            console.error("Failed to save project:", error);
            alert("Failed to save project. Please check the console for details.");
        }
    };

    const handleArrayChange = (
        field: "description" | "techStack",
        index: number,
        value: string
    ) => {
        const newArray = [...formData[field]];
        newArray[index] = value;
        setFormData({ ...formData, [field]: newArray });
    };

    const addArrayItem = (field: "description" | "techStack") => {
        setFormData({ ...formData, [field]: [...formData[field], ""] });
    };

    const removeArrayItem = (field: "description" | "techStack", index: number) => {
        const newArray = [...formData[field]];
        newArray.splice(index, 1);
        setFormData({ ...formData, [field]: newArray });
    };

    return (
        <Card hoverEffect={false} className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">
                    {initialData ? "Edit Project" : "New Project"}
                </h2>
                <button onClick={onClose} className="text-gray-400 hover:text-white">
                    <X size={24} />
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Title</label>
                        <input
                            type="text"
                            required
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Role</label>
                        <input
                            type="text"
                            required
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Company (Optional)</label>
                        <input
                            type="text"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Date</label>
                        <input
                            type="text"
                            required
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            placeholder="e.g. 2023 - Present"
                            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Category</label>
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value as "work" | "personal" })}
                            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                        >
                            <option value="work">Work</option>
                            <option value="personal">Personal</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">XP</label>
                        <input
                            type="number"
                            value={formData.xp}
                            onChange={(e) => setFormData({ ...formData, xp: parseInt(e.target.value) || 0 })}
                            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Link (Optional)</label>
                        <input
                            type="text"
                            value={formData.link}
                            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Logo URL (Optional)</label>
                        <input
                            type="text"
                            value={formData.logo}
                            onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Linked Experience (Optional)</label>
                        <select
                            value={formData.experienceId || ""}
                            onChange={(e) => setFormData({ ...formData, experienceId: e.target.value ? (e.target.value as Id<"experiences">) : undefined })}
                            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                        >
                            <option value="">None</option>
                            {experiences?.map(exp => (
                                <option key={exp._id} value={exp._id}>{exp.name} - {exp.role}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Description Points</label>
                    <div className="space-y-2">
                        {formData.description.map((desc, index) => (
                            <div key={index} className="flex gap-2">
                                <input
                                    type="text"
                                    value={desc}
                                    onChange={(e) => handleArrayChange("description", index, e.target.value)}
                                    className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeArrayItem("description", index)}
                                    className="p-2 text-gray-400 hover:text-red-400"
                                >
                                    <Trash size={18} />
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => addArrayItem("description")}
                            className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
                        >
                            <Plus size={16} /> Add Point
                        </button>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Tech Stack</label>
                    <div className="flex flex-wrap gap-2">
                        {formData.techStack.map((tech, index) => (
                            <div key={index} className="flex items-center bg-gray-900 border border-gray-700 rounded-lg pl-3 pr-1 py-1">
                                <input
                                    type="text"
                                    value={tech}
                                    onChange={(e) => handleArrayChange("techStack", index, e.target.value)}
                                    className="bg-transparent border-none text-white focus:outline-none w-24 text-sm"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeArrayItem("techStack", index)}
                                    className="p-1 text-gray-400 hover:text-red-400"
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => addArrayItem("techStack")}
                            className="px-3 py-1 text-sm border border-dashed border-gray-600 text-gray-400 rounded-lg hover:border-blue-500 hover:text-blue-400 transition-colors"
                        >
                            + Add Tech
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
                        Save Project
                    </button>
                </div>
            </form>
        </Card>
    );
}

