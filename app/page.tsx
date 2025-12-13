import React from "react";
import type { Metadata } from "next";
import ProjectShowcase from "./components/ProjectShowcase";
import { api } from "../convex/_generated/api";
import { getConvexHttpClient } from "@/lib/convex";
import { Project } from "@/lib/data";

export const metadata: Metadata = {
  title: "Kyle Osunero | Portfolio",
};

export default async function Home() {
  const convex = getConvexHttpClient();

  const [projectsDocs, featuredCompany, experiences, skills] =
    await Promise.all([
      convex.query(api.queries.getProjects),
      convex.query(api.queries.getFeaturedCompany),
      convex.query(api.queries.getExperiences),
      convex.query(api.queries.getSkills),
    ]);

  if (!featuredCompany) {
    throw new Error("Featured company data missing");
  }

  const projects: Project[] = projectsDocs.map((project) => ({
    title: project.title,
    role: project.role,
    company: project.company ?? undefined,
    experienceId: project.experienceId ? String(project.experienceId) : undefined,
    date: project.date,
    description: project.description,
    techStack: project.techStack,
    link: project.link ?? undefined,
    logo: project.logo ?? undefined,
    category: project.category,
    xp: project.xp ?? undefined,
  }));

  return (
    <ProjectShowcase
      projects={projects}
      featuredCompany={featuredCompany}
      experiences={experiences}
      skills={skills}
    />
  );
}
