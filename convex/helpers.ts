import { QueryCtx, MutationCtx } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export async function checkAdmin(ctx: QueryCtx | MutationCtx) {
  const userId = await getAuthUserId(ctx);
  if (!userId) {
    throw new Error("Unauthorized: User is not authenticated");
  }

  const user = await ctx.db.get(userId);
  if (!user) {
    throw new Error("Unauthorized: User not found");
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) {
    throw new Error("Server configuration error: ADMIN_EMAIL not set");
  }

  if (user.email !== adminEmail) {
    // Check whitelist
    const whitelisted = await ctx.db
      .query("whitelistedEmails")
      .withIndex("by_email", (q) => q.eq("email", user.email ?? ""))
      .first();

    if (!whitelisted) {
      throw new Error("Unauthorized: User is not an admin");
    }
  }

  return user;
}

