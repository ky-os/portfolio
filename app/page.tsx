import React from "react";
import type { Metadata } from "next";
import ProjectShowcase from "./components/ProjectShowcase";
import { convex } from "@/lib/convex";
import { api } from "../convex/_generated/api";

export const metadata: Metadata = {
  title: "Kyle Osunero | Portfolio",
};

export default async function Home() {
  const projects = await convex.query(api.queries.getProjects);
  const featuredCompany = await convex.query(api.queries.getFeaturedCompany);
  const experiences = await convex.query(api.queries.getExperiences);
  const skills = await convex.query(api.queries.getSkills);

  if (!featuredCompany) {
    return <div>Error: Featured company data missing. Please seed the database.</div>;
  }

  return (
    <ProjectShowcase
      projects={projects}
      featuredCompany={featuredCompany}
      experiences={experiences}
      skills={skills}
    />
  );
}
