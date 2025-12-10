import { action } from "./_generated/server";
import { api } from "./_generated/api";
import { Id } from "./_generated/dataModel";
import { experiences, projects, bookmarks, featuredCompany } from "@/lib/data";

// Action to clear all data
export const clearData = action({
  args: {},
  handler: async (ctx) => {
    console.log("Clearing all data...");
    await ctx.runMutation(api.mutations.clearAllData, {});
    console.log("All data cleared!");
  },
});

// Action to seed data
export const seedData = action({
  args: {},
  handler: async (ctx) => {
    console.log("Starting database seed...");

    // 1. Clear existing data
    await ctx.runMutation(api.mutations.clearAllData, {});
    console.log("Cleared existing data.");

    // 2. Seed Experiences and keep track of IDs
    const experienceIdMap = new Map<string, Id<"experiences">>();

    for (const exp of experiences) {
      const { id, logo, ...expData } = exp;
      // Convert null to undefined for logo to match Convex schema
      const sanitizedExp = {
        ...expData,
        logo: logo ?? undefined,
      };
      const newId = await ctx.runMutation(api.mutations.addExperience, sanitizedExp);
      experienceIdMap.set(id, newId);
      console.log(`Added experience: ${exp.name}`);
    }

    // 3. Seed Projects (linking to experiences)
    for (const project of projects) {
      let experienceId: Id<"experiences"> | undefined;

      if (project.experienceId) {
        experienceId = experienceIdMap.get(project.experienceId);
        if (!experienceId) {
          console.warn(
            `Warning: Experience ID '${project.experienceId}' not found for project '${project.title}'`
          );
        }
      }

      // Remove the string experienceId and replace with the actual ID
      const { experienceId: _, ...projectData } = project;

      await ctx.runMutation(api.mutations.addProject, {
        ...projectData,
        experienceId,
        category: project.category as "work" | "personal",
      });
      console.log(`Added project: ${project.title}`);
    }

    // 4. Seed Bookmarks
    for (const bookmark of bookmarks) {
      await ctx.runMutation(api.mutations.addBookmark, bookmark);
      console.log(`Added bookmark: ${bookmark.title}`);
    }

    // 5. Seed Featured Company
    await ctx.runMutation(
      api.mutations.addFeaturedCompany,
      featuredCompany
    );
    console.log("Added featured company.");

    console.log("Database seeding completed successfully!");
  },
});
