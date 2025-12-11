"use client";

import React, { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { X } from "lucide-react";
import { revalidateHome } from "@/app/actions";
import { Card } from "../ui/Card";

interface BookmarkFormProps {
    initialData: Doc<"bookmarks"> | null;
    onClose: () => void;
}

export function BookmarkForm({ initialData, onClose }: BookmarkFormProps) {
    const addBookmark = useMutation(api.mutations.addBookmark);
    const updateBookmark = useMutation(api.mutations.updateBookmark);

    const [formData, setFormData] = useState({
        title: initialData?.title || "",
        description: initialData?.description || "",
        techStack: initialData?.techStack || [""],
        link: initialData?.link || "",
        category: initialData?.category || "",
        logo: initialData?.logo || "",
        tags: initialData?.tags || [""],
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const cleanTechStack = formData.techStack.filter(t => t.trim() !== "");
        const cleanTags = formData.tags.filter(t => t.trim() !== "");

        const bookmarkData = {
            ...formData,
            techStack: cleanTechStack,
            tags: cleanTags,
        };

        try {
            if (initialData) {
                await updateBookmark({
                    id: initialData._id,
                    ...bookmarkData,
                });
            } else {
                await addBookmark(bookmarkData);
            }
            await revalidateHome();
            onClose();
        } catch (error) {
            console.error("Failed to save bookmark:", error);
            alert("Failed to save bookmark. Please check the console for details.");
        }
    };

    const handleArrayChange = (
        field: "techStack" | "tags",
        index: number,
        value: string
    ) => {
        const newArray = [...formData[field]];
        newArray[index] = value;
        setFormData({ ...formData, [field]: newArray });
    };

    const addArrayItem = (field: "techStack" | "tags") => {
        setFormData({ ...formData, [field]: [...formData[field], ""] });
    };

    const removeArrayItem = (field: "techStack" | "tags", index: number) => {
        const newArray = [...formData[field]];
        newArray.splice(index, 1);
        setFormData({ ...formData, [field]: newArray });
    };

    return (
        <Card hoverEffect={false} className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">
                    {initialData ? "Edit Bookmark" : "New Bookmark"}
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
                        <label className="block text-sm font-medium text-gray-400 mb-1">Category</label>
                        <input
                            type="text"
                            required
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Link</label>
                        <input
                            type="text"
                            required
                            value={formData.link}
                            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Logo URL</label>
                        <input
                            type="text"
                            required
                            value={formData.logo}
                            onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
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
                        rows={3}
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                    />
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

                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Tags</label>
                    <div className="flex flex-wrap gap-2">
                        {formData.tags.map((tag, index) => (
                            <div key={index} className="flex items-center bg-gray-900 border border-gray-700 rounded-lg pl-3 pr-1 py-1">
                                <input
                                    type="text"
                                    value={tag}
                                    onChange={(e) => handleArrayChange("tags", index, e.target.value)}
                                    className="bg-transparent border-none text-white focus:outline-none w-24 text-sm"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeArrayItem("tags", index)}
                                    className="p-1 text-gray-400 hover:text-red-400"
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => addArrayItem("tags")}
                            className="px-3 py-1 text-sm border border-dashed border-gray-600 text-gray-400 rounded-lg hover:border-blue-500 hover:text-blue-400 transition-colors"
                        >
                            + Add Tag
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
                        Save Bookmark
                    </button>
                </div>
            </form>
        </Card>
    );
}

