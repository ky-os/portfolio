"use client";

import React, { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { X } from "lucide-react";

interface ExperienceFormProps {
    initialData: Doc<"experiences"> | null;
    onClose: () => void;
}

export function ExperienceForm({ initialData, onClose }: ExperienceFormProps) {
    const addExperience = useMutation(api.mutations.addExperience);
    const updateExperience = useMutation(api.mutations.updateExperience);

    const [formData, setFormData] = useState({
        name: initialData?.name || "",
        role: initialData?.role || "",
        period: initialData?.period || "",
        logo: initialData?.logo || "",
        url: initialData?.url || "",
        description: initialData?.description || "",
        initials: initialData?.initials || "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (initialData) {
                await updateExperience({
                    id: initialData._id,
                    ...formData,
                });
            } else {
                await addExperience(formData);
            }
            onClose();
        } catch (error) {
            console.error("Failed to save experience:", error);
            alert("Failed to save experience. Please check the console for details.");
        }
    };

    return (
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">
                    {initialData ? "Edit Experience" : "New Experience"}
                </h2>
                <button onClick={onClose} className="text-gray-400 hover:text-white">
                    <X size={24} />
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Company Name</label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                        <label className="block text-sm font-medium text-gray-400 mb-1">Period</label>
                        <input
                            type="text"
                            required
                            value={formData.period}
                            onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                            placeholder="e.g. 2023 - Present"
                            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">URL</label>
                        <input
                            type="text"
                            required
                            value={formData.url}
                            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
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
                        <label className="block text-sm font-medium text-gray-400 mb-1">Initials (Optional)</label>
                        <input
                            type="text"
                            value={formData.initials}
                            onChange={(e) => setFormData({ ...formData, initials: e.target.value })}
                            placeholder="e.g. SX"
                            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
                    <textarea
                        required
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={4}
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                    />
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
                        Save Experience
                    </button>
                </div>
            </form>
        </div>
    );
}

