import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getConvexHttpClient } from "@/lib/convex";
import { api } from "../../convex/_generated/api";
import { Doc } from "../../convex/_generated/dataModel";

export const metadata = {
  title: "Bookmarks | Kyle Osunero",
  description: "A collection of interesting tools and references.",
};

export default async function BookmarksPage() {
  const convex = getConvexHttpClient();
  const bookmarks = await convex.query(api.queries.getBookmarks);

  const groupedBookmarks = bookmarks.reduce((acc, bookmark) => {
    const category = bookmark.category || "Uncategorized";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(bookmark);
    return acc;
  }, {} as Record<string, Doc<"bookmarks">[]>);

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans selection:bg-blue-500/30">
      <header className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-blue-900/20 via-gray-900/0 to-gray-900/0 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <Link href="/" className="mb-8 text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Back to Home
          </Link>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight bg-clip-text text-transparent bg-linear-to-b from-white to-white/60">
            Bookmarks
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-2xl mx-auto font-light">
            A curated list of tools, frameworks, and references I find interesting.
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 pb-24 space-y-16">
        {Object.entries(groupedBookmarks).map(([category, items]) => (
          <section key={category}>
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-2xl font-bold text-white">{category}</h2>
              <div className="h-px bg-gray-800 flex-1"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {items.map((bookmark, index) => (
                <div
                  key={index}
                  className="group relative bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-colors"
                >
                  <div className="absolute -inset-0.5 bg-linear-to-r from-blue-500/0 via-blue-500/0 to-purple-500/0 group-hover:from-blue-500/20 group-hover:via-purple-500/20 group-hover:to-blue-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition duration-500 blur-sm"></div>
                  <div className="relative h-full flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        {bookmark.logo && (
                          <div className="shrink-0 bg-gray-800 p-1.5 rounded-lg border border-gray-700">
                            <Image
                              src={bookmark.logo}
                              alt={`${bookmark.title} logo`}
                              width={32}
                              height={32}
                              className="w-8 h-8 object-contain"
                              unoptimized
                            />
                          </div>
                        )}
                        <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                          {bookmark.title}
                        </h3>
                      </div>
                      <Link
                        href={bookmark.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-white transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                        </svg>
                      </Link>
                    </div>
                    <p className="text-gray-400 mb-6 grow">
                      {bookmark.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {bookmark.techStack.map((tech, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 text-xs font-medium rounded-md bg-gray-800 text-gray-400 border border-gray-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
