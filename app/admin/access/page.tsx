import React from "react";
import { fetchQuery } from "convex/nextjs";
import { redirect } from "next/navigation";
import {
    convexAuthNextjsToken,
    isAuthenticatedNextjs,
} from "@convex-dev/auth/nextjs/server";
import { api } from "@/convex/_generated/api";
import { SectionHeader } from "@/app/components/ui/SectionHeader";
import WhitelistManager from "@/app/components/admin/WhitelistManager";

export default async function AccessControlPage() {
    const isAuthenticated = await isAuthenticatedNextjs();
    if (!isAuthenticated) redirect("/admin");

    const token = await convexAuthNextjsToken();
    const isAdmin = await fetchQuery(api.queries.isAdmin, {}, { token });
    if (!isAdmin) redirect("/intruder");

    return (
        <div className="max-w-4xl mx-auto">
            <SectionHeader
                title="Access Control"
                subtitle="Manage whitelisted users who can access the admin dashboard."
                className="mb-8"
            />
            <WhitelistManager />
        </div>
    );
}

