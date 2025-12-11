import React from "react";
import { preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { BookmarkList } from "@/app/components/admin/BookmarkList";
import { SectionHeader } from "@/app/components/ui/SectionHeader";

export default async function BookmarksPage() {
    const preloadedBookmarks = await preloadQuery(api.queries.getBookmarks);

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

