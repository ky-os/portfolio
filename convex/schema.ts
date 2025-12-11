import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

export default defineSchema({
  ...authTables,
  experiences: defineTable({
    name: v.string(),
    role: v.string(),
    period: v.string(),
    logo: v.optional(v.string()),
    url: v.string(),
    description: v.string(),
    initials: v.optional(v.string()),
    slug: v.optional(v.string()),
    order: v.optional(v.number()),
  })
    .index("by_slug", ["slug"])
    .index("by_order", ["order"]),

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
    order: v.optional(v.number()),
  })
    .index("by_experience", ["experienceId"])
    .index("by_category", ["category"])
    .index("by_order", ["order"]),

  bookmarks: defineTable({
    title: v.string(),
    description: v.string(),
    techStack: v.array(v.string()),
    link: v.string(),
    category: v.string(),
    logo: v.string(),
    tags: v.optional(v.array(v.string())),
    order: v.optional(v.number()),
  })
    .index("by_category", ["category"])
    .index("by_order", ["order"]),

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

  skills: defineTable({
    category: v.string(), // "languages", "frameworks", "tools"
    items: v.array(v.object({ name: v.string(), icon: v.string() })),
    order: v.optional(v.number()),
  })
    .index("by_category", ["category"])
    .index("by_order", ["order"]),

  intruders: defineTable({
    name: v.optional(v.string()),
    email: v.string(),
    image: v.optional(v.string()),
    attempts: v.number(),
    lastAttempt: v.number(),
  })
    .index("by_email", ["email"])
    .index("by_attempts", ["attempts"]),

  whitelistedEmails: defineTable({
    email: v.string(),
    addedBy: v.optional(v.string()), // email of admin who added them
    addedAt: v.number(),
  })
    .index("by_email", ["email"]),
});
