import React from "react";
import { BookmarkList } from "@/app/components/admin/BookmarkList";
import { SectionHeader } from "@/app/components/ui/SectionHeader";

export default function BookmarksPage() {
    return (
        <div>
            <SectionHeader
                title="Bookmarks"
                subtitle="Curate your reading list and resources."
                className="mb-8"
            />
            <BookmarkList />
        </div>
    );
}

