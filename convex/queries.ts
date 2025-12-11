import { query } from "./_generated/server";
import { v } from "convex/values";

export const getExperiences = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("experiences")
      .withIndex("by_order")
      .order("desc")
      .collect();
  },
});

export const getProjects = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("projects")
      .withIndex("by_order")
      .order("desc")
      .collect();
  },
});

export const getProjectsByCategory = query({
  args: { category: v.union(v.literal("work"), v.literal("personal")) },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("projects")
      .withIndex("by_category", (q) => q.eq("category", args.category))
      .collect();
  },
});

export const getBookmarks = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("bookmarks")
      .withIndex("by_order")
      .order("desc")
      .collect();
  },
});

export const getBookmarksByCategory = query({
  args: { category: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("bookmarks")
      .withIndex("by_category", (q) => q.eq("category", args.category))
      .collect();
  },
});

export const getFeaturedCompany = query({
  args: {},
  handler: async (ctx) => {
    const companies = await ctx.db.query("featuredCompany").collect();
    return companies[0]; // Assuming only one
  },
});

export const getSkills = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("skills")
      .withIndex("by_order")
      .order("desc")
      .collect();
  },
});
