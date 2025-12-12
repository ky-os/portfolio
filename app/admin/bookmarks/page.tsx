import React from "react";
import { fetchQuery, preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { BookmarkList } from "@/app/components/admin/BookmarkList";
import { SectionHeader } from "@/app/components/ui/SectionHeader";

import {
    convexAuthNextjsToken,
    isAuthenticatedNextjs,
} from "@convex-dev/auth/nextjs/server";
import { redirect } from "next/navigation";

export default async function BookmarksPage() {
    const isAuthenticated = await isAuthenticatedNextjs();
    if (!isAuthenticated) redirect("/admin");

    const token = await convexAuthNextjsToken();
    const isAdmin = await fetchQuery(api.queries.isAdmin, {}, { token });
    if (!isAdmin) redirect("/intruder");

    const preloadedBookmarks = await preloadQuery(api.queries.getBookmarks, undefined, { token });

    return (
        <div>
            <SectionHeader
                title="Bookmarks"
                subtitle="Curate your reading list and resources."
                className="mb-8"
            />
            <BookmarkList preloadedBookmarks={preloadedBookmarks} />
        </div>
    );
}

