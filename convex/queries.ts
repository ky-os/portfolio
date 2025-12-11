import { query, internalQuery } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";
import { checkAdmin } from "./helpers";

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

export const getIntruders = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    const user = userId ? await ctx.db.get(userId) : null;
    const userEmail = user?.email;

    const intruders = await ctx.db
      .query("intruders")
      .withIndex("by_attempts")
      .order("desc")
      .take(100);

    return intruders.map((intruder) => {
      if (intruder.email === userEmail) {
        return intruder;
      }

      // Masking logic for other users
      const maskString = (str?: string) => {
        if (!str) return "Anonymous";
        return str
          .split(" ")
          .map((part) =>
            part.length > 1 ? part[0] + "*".repeat(part.length - 1) : part
          )
          .join(" ");
      };

      return {
        ...intruder,
        name: maskString(intruder.name),
        email: undefined, // Don't leak emails of others
      };
    });
  },
});

export const getWhitelistedEmails = query({
  args: {},
  handler: async (ctx) => {
    await checkAdmin(ctx);
    return await ctx.db.query("whitelistedEmails").collect();
  },
});

export const isAdmin = query({
  args: {},
  handler: async (ctx) => {
    try {
      await checkAdmin(ctx);
      return true;
    } catch {
      return false;
    }
  },
});

export const checkEmailAccess = internalQuery({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const adminEmail = process.env.ADMIN_EMAIL;
    if (adminEmail && args.email === adminEmail) return true;

    const whitelisted = await ctx.db
      .query("whitelistedEmails")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();
      
    return !!whitelisted;
  },
});
