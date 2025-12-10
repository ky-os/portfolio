import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  experiences: defineTable({
    name: v.string(),
    role: v.string(),
    period: v.string(),
    logo: v.optional(v.string()),
    url: v.string(),
    description: v.string(),
    initials: v.optional(v.string()),
  }),

  projects: defineTable({
    title: v.string(),
    role: v.string(),
    company: v.optional(v.string()),
    experienceId: v.optional(v.id("experiences")),
    date: v.string(),
    description: v.array(v.string()),
    techStack: v.array(v.string()),
    link: v.optional(v.string()),
    logo: v.optional(v.string()),
    category: v.union(v.literal("work"), v.literal("personal")),
    xp: v.optional(v.number()),
  }).index("by_experience", ["experienceId"]).index("by_category", ["category"]),

  bookmarks: defineTable({
    title: v.string(),
    description: v.string(),
    techStack: v.array(v.string()),
    link: v.string(),
    category: v.string(),
    logo: v.string(),
    tags: v.optional(v.array(v.string())),
  }).index("by_category", ["category"]),

  featuredCompany: defineTable({
    name: v.string(),
    role: v.string(),
    period: v.string(),
    status: v.string(),
    description: v.string(),
    logo: v.string(),
    url: v.string(),
    highlights: v.array(v.string()),
  }),
});