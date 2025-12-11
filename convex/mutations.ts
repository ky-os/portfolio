import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Experiences mutations
export const addExperience = mutation({
  args: {
    name: v.string(),
    role: v.string(),
    period: v.string(),
    logo: v.optional(v.string()),
    url: v.string(),
    description: v.string(),
    initials: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("experiences", args);
    return id;
  },
});

export const updateExperience = mutation({
  args: {
    id: v.id("experiences"),
    name: v.optional(v.string()),
    role: v.optional(v.string()),
    period: v.optional(v.string()),
    logo: v.optional(v.string()),
    url: v.optional(v.string()),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
  },
});

export const deleteExperience = mutation({
  args: { id: v.id("experiences") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// Skills mutations
export const addSkill = mutation({
  args: {
    category: v.string(),
    items: v.array(v.object({ name: v.string(), icon: v.string() })),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("skills", args);
    return id;
  },
});

export const updateSkill = mutation({
  args: {
    id: v.id("skills"),
    category: v.optional(v.string()),
    items: v.optional(
      v.array(v.object({ name: v.string(), icon: v.string() }))
    ),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
  },
});

export const deleteSkill = mutation({
  args: { id: v.id("skills") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// Projects mutations
export const addProject = mutation({
  args: {
    title: v.string(),
    role: v.string(),
    company: v.optional(v.string()),
    experienceId: v.optional(v.id("experiences")),
    date: v.string(),
    description: v.array(v.string()),
    techStack: v.array(v.string()),
    link: v.optional(v.string()),
    logo: v.optional(v.string()),
    xp: v.optional(v.number()),
    category: v.union(v.literal("work"), v.literal("personal")),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("projects", args);
    return id;
  },
});

export const updateProject = mutation({
  args: {
    id: v.id("projects"),
    title: v.optional(v.string()),
    role: v.optional(v.string()),
    company: v.optional(v.string()),
    date: v.optional(v.string()),
    description: v.optional(v.array(v.string())),
    techStack: v.optional(v.array(v.string())),
    link: v.optional(v.string()),
    logo: v.optional(v.string()),
    xp: v.optional(v.number()),
    category: v.optional(v.union(v.literal("work"), v.literal("personal"))),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
  },
});

export const deleteProject = mutation({
  args: { id: v.id("projects") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// Bookmarks mutations
export const addBookmark = mutation({
  args: {
    title: v.string(),
    link: v.string(),
    description: v.string(),
    category: v.string(),
    tags: v.optional(v.array(v.string())),
    techStack: v.array(v.string()),
    logo: v.string(),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("bookmarks", args);
    return id;
  },
});

export const updateBookmark = mutation({
  args: {
    id: v.id("bookmarks"),
    title: v.optional(v.string()),
    link: v.optional(v.string()),
    description: v.optional(v.string()),
    category: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    techStack: v.optional(v.array(v.string())),
    logo: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
  },
});

export const deleteBookmark = mutation({
  args: { id: v.id("bookmarks") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const addFeaturedCompany = mutation({
  args: {
    name: v.string(),
    role: v.string(),
    period: v.string(),
    status: v.string(),
    description: v.string(),
    logo: v.string(),
    url: v.string(),
    highlights: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("featuredCompany", args);
    return id;
  },
});

// Clear all data mutation
export const clearAllData = mutation({
  args: {},
  handler: async (ctx) => {
    // Delete all experiences
    const experiences = await ctx.db.query("experiences").collect();
    for (const exp of experiences) {
      await ctx.db.delete(exp._id);
    }

    // Delete all projects
    const projects = await ctx.db.query("projects").collect();
    for (const proj of projects) {
      await ctx.db.delete(proj._id);
    }

    // Delete all bookmarks
    const bookmarks = await ctx.db.query("bookmarks").collect();
    for (const bm of bookmarks) {
      await ctx.db.delete(bm._id);
    }

    // Delete all featured companies
    const featuredCompanies = await ctx.db.query("featuredCompany").collect();
    for (const fc of featuredCompanies) {
      await ctx.db.delete(fc._id);
    }

    return "All data cleared";
  },
});
