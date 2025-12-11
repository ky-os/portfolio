import React from "react";
import type { Metadata } from "next";
import { preloadQuery } from "convex/nextjs";
import ProjectShowcase from "./components/ProjectShowcase";
import { api } from "../convex/_generated/api";

export const metadata: Metadata = {
  title: "Kyle Osunero | Portfolio",
};

export default async function Home() {
  const preloadedProjects = await preloadQuery(api.queries.getProjects);
  const preloadedFeaturedCompany = await preloadQuery(api.queries.getFeaturedCompany);
  const preloadedExperiences = await preloadQuery(api.queries.getExperiences);
  const preloadedSkills = await preloadQuery(api.queries.getSkills);

  return (
    <ProjectShowcase
      preloadedProjects={preloadedProjects}
      preloadedFeaturedCompany={preloadedFeaturedCompany}
      preloadedExperiences={preloadedExperiences}
      preloadedSkills={preloadedSkills}
    />
  );
}
