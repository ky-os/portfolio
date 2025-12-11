"use client";

import React, { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { Edit, Trash2, Plus } from "lucide-react";
import { BookmarkForm } from "./BookmarkForm";
import { Card, CardContent } from "../ui/Card";

export function BookmarkList() {
    const bookmarks = useQuery(api.queries.getBookmarks);
    const deleteBookmark = useMutation(api.mutations.deleteBookmark);
    const [editingBookmark, setEditingBookmark] = useState<Doc<"bookmarks"> | null>(null);
    const [isCreating, setIsCreating] = useState(false);

    if (!bookmarks) {
        return <div className="text-gray-400 animate-pulse">Loading bookmarks...</div>;
    }

    const handleDelete = async (id: Doc<"bookmarks">["_id"]) => {
        if (confirm("Are you sure you want to delete this bookmark?")) {
            await deleteBookmark({ id });
        }
    };

    if (isCreating || editingBookmark) {
        return (
            <BookmarkForm
                initialData={editingBookmark}
                onClose={() => {
                    setIsCreating(false);
                    setEditingBookmark(null);
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
                    Add Bookmark
                </button>
            </div>

            <div className="grid gap-4">
                {bookmarks.map((bookmark, index) => (
                    <Card key={bookmark._id} delay={index * 0.05} className="group">
                        <CardContent className="flex justify-between items-center p-5">
                            <div>
                                <h3 className="font-bold text-white text-lg group-hover:text-blue-400 transition-colors">{bookmark.title}</h3>
                                <p className="text-sm text-gray-400 mt-1">{bookmark.category}</p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setEditingBookmark(bookmark)}
                                    className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                                    title="Edit"
                                >
                                    <Edit size={18} />
                                </button>
                                <button
                                    onClick={() => handleDelete(bookmark._id)}
                                    className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                    title="Delete"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {bookmarks.length === 0 && (
                    <div className="text-center py-16 text-gray-500 bg-gray-900/30 rounded-xl border border-gray-800 border-dashed">
                        <p>No bookmarks found.</p>
                        <button
                            onClick={() => setIsCreating(true)}
                            className="text-blue-400 hover:text-blue-300 mt-2 font-medium"
                        >
                            Create your first bookmark
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

