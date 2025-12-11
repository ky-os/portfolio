"use client";

import React, { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Trash2, Plus, Shield, UserCheck } from "lucide-react";
import { Card, CardContent } from "../ui/Card";

export default function WhitelistManager() {
    const whitelistedEmails = useQuery(api.queries.getWhitelistedEmails);
    const addToWhitelist = useMutation(api.mutations.addToWhitelist);
    const removeFromWhitelist = useMutation(api.mutations.removeFromWhitelist);

    const [newEmail, setNewEmail] = useState("");
    const [error, setError] = useState("");

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!newEmail) return;

        try {
            await addToWhitelist({ email: newEmail });
            setNewEmail("");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to add email");
        }
    };

    const handleRemove = async (id: Id<"whitelistedEmails">) => {
        if (confirm("Are you sure you want to remove this email from the whitelist?")) {
            await removeFromWhitelist({ id });
        }
    };

    if (!whitelistedEmails) {
        return <div className="text-gray-400">Loading whitelist...</div>;
    }

    return (
        <div className="space-y-6">
            <Card className="border-gray-800">
                <CardContent>
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <Shield className="text-blue-400" size={20} />
                        Add to Whitelist
                    </h3>
                    <form onSubmit={handleAdd} className="flex gap-4">
                        <input
                            type="email"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                            placeholder="Enter email address..."
                            className="flex-1 bg-gray-950 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                        >
                            <Plus size={18} />
                            Add
                        </button>
                    </form>
                    {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
                </CardContent>
            </Card>

            <div className="grid gap-4">
                {whitelistedEmails.map((item) => (
                    <Card key={item._id} className="border-gray-800 group hover:border-gray-700">
                        <CardContent className="flex items-center justify-between py-4">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-400">
                                    <UserCheck size={20} />
                                </div>
                                <div>
                                    <p className="text-white font-medium">{item.email}</p>
                                    <p className="text-xs text-gray-500">
                                        Added by {item.addedBy} on {new Date(item.addedAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => handleRemove(item._id)}
                                className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                title="Remove from whitelist"
                            >
                                <Trash2 size={18} />
                            </button>
                        </CardContent>
                    </Card>
                ))}

                {whitelistedEmails.length === 0 && (
                    <div className="text-center py-12 text-gray-500 border border-dashed border-gray-800 rounded-xl">
                        No whitelisted emails found.
                    </div>
                )}
            </div>
        </div>
    );
}

