import React from "react";
import type { Metadata } from "next";
import { preloadQuery } from "convex/nextjs";
import ProjectShowcase from "./components/ProjectShowcase";
import { api } from "../convex/_generated/api";

export const metadata: Metadata = {
  title: "Kyle Osunero | Portfolio",
};

export default async function Home() {
  const [
    preloadedProjects,
    preloadedFeaturedCompany,
    preloadedExperiences,
    preloadedSkills,
  ] = await Promise.all([
    preloadQuery(api.queries.getProjects),
    preloadQuery(api.queries.getFeaturedCompany),
    preloadQuery(api.queries.getExperiences),
    preloadQuery(api.queries.getSkills),
  ]);

  return (
    <ProjectShowcase
      preloadedProjects={preloadedProjects}
      preloadedFeaturedCompany={preloadedFeaturedCompany}
      preloadedExperiences={preloadedExperiences}
      preloadedSkills={preloadedSkills}
    />
  );
}
