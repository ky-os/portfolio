import React from "react";
import { BookmarkList } from "@/app/components/admin/BookmarkList";

export default function BookmarksPage() {
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Bookmarks</h1>
                <p className="text-gray-400">Curate your reading list and resources.</p>
            </div>
            <BookmarkList />
        </div>
    );
}

