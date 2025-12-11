"use client";

import React, { useState } from "react";
import { useMutation } from "convex/react";
import { Preloaded, usePreloadedQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { Edit, Trash2, Plus, GripVertical } from "lucide-react";
import { ProjectForm } from "./ProjectForm";
import { Card, CardContent } from "../ui/Card";
import { Reorder } from "framer-motion";
import { revalidateHome } from "@/app/actions";

interface ProjectListProps {
    preloadedProjects: Preloaded<typeof api.queries.getProjects>;
}

export function ProjectList({ preloadedProjects }: ProjectListProps) {
    const projects = usePreloadedQuery(preloadedProjects);
    const deleteProject = useMutation(api.mutations.deleteProject);
    const reorderProjects = useMutation(api.mutations.reorderProjects);
    const [editingProject, setEditingProject] = useState<Doc<"projects"> | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [workItems, setWorkItems] = useState(projects.filter(p => p.category === "work"));
    const [personalItems, setPersonalItems] = useState(projects.filter(p => p.category === "personal"));

    React.useEffect(() => {
        setWorkItems(projects.filter(p => p.category === "work"));
        setPersonalItems(projects.filter(p => p.category === "personal"));
    }, [projects]);

    const handleDelete = async (id: Doc<"projects">["_id"]) => {
        if (confirm("Are you sure you want to delete this project?")) {
            await deleteProject({ id });
            await revalidateHome();
        }
    };

    const handleDragEnd = async (items: Doc<"projects">[]) => {
        const updates = items.map((project, index) => ({
            id: project._id,
            order: items.length - index
        }));
        await reorderProjects({ items: updates });
        await revalidateHome();
    };

    if (isCreating || editingProject) {
        return (
            <ProjectForm
                initialData={editingProject}
                onClose={() => {
                    setIsCreating(false);
                    setEditingProject(null);
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
                    Add Project
                </button>
            </div>

            <div className="space-y-8">
                <div>
                    <h3 className="text-xl font-bold text-white mb-4">Work Projects</h3>
                    <Reorder.Group axis="y" values={workItems} onReorder={setWorkItems} className="flex flex-col gap-4">
                        {workItems.map((project) => (
                            <Reorder.Item key={project._id} value={project} onDragEnd={() => handleDragEnd(workItems)}>
                                <Card delay={0} className="group relative">
                                    <CardContent className="flex justify-between items-center p-5 pl-12">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing text-gray-600 hover:text-gray-400 p-2">
                                            <GripVertical size={20} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-white text-lg group-hover:text-blue-400 transition-colors">{project.title}</h3>
                                            <p className="text-sm text-gray-400 mt-1">{project.role} • {project.category}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => setEditingProject(project)}
                                                className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                                                title="Edit"
                                            >
                                                <Edit size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(project._id)}
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
                        {workItems.length === 0 && (
                            <div className="text-center py-8 text-gray-500 bg-gray-900/30 rounded-xl border border-gray-800 border-dashed">
                                <p>No work projects found.</p>
                                <button
                                    onClick={() => setIsCreating(true)}
                                    className="text-blue-400 hover:text-blue-300 mt-2 font-medium"
                                >
                                    Add a work project
                                </button>
                            </div>
                        )}
                    </Reorder.Group>
                </div>

                <div>
                    <h3 className="text-xl font-bold text-white mb-4">Personal Projects</h3>
                    <Reorder.Group axis="y" values={personalItems} onReorder={setPersonalItems} className="flex flex-col gap-4">
                        {personalItems.map((project) => (
                            <Reorder.Item key={project._id} value={project} onDragEnd={() => handleDragEnd(personalItems)}>
                                <Card delay={0} className="group relative">
                                    <CardContent className="flex justify-between items-center p-5 pl-12">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing text-gray-600 hover:text-gray-400 p-2">
                                            <GripVertical size={20} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-white text-lg group-hover:text-blue-400 transition-colors">{project.title}</h3>
                                            <p className="text-sm text-gray-400 mt-1">{project.role} • {project.category}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => setEditingProject(project)}
                                                className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                                                title="Edit"
                                            >
                                                <Edit size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(project._id)}
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
                        {personalItems.length === 0 && (
                            <div className="text-center py-8 text-gray-500 bg-gray-900/30 rounded-xl border border-gray-800 border-dashed">
                                <p>No personal projects found.</p>
                                <button
                                    onClick={() => setIsCreating(true)}
                                    className="text-blue-400 hover:text-blue-300 mt-2 font-medium"
                                >
                                    Add a personal project
                                </button>
                            </div>
                        )}
                    </Reorder.Group>
                </div>
            </div>
        </div>
    );
}

