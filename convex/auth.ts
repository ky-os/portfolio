import GitHub from "@auth/core/providers/github";
import { convexAuth } from "@convex-dev/auth/server";
import { api, internal } from "./_generated/api";

export const { auth, signIn, signOut, store } = convexAuth({
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name ?? profile.login,
          email: profile.email,
          image: profile.avatar_url,
        };
      },
    }),
  ],
  callbacks: {
    async afterUserCreatedOrUpdated(ctx, { profile }) {
      const email = profile.email as string | undefined;
      if (!email) return;

      const hasAccess = await ctx.runQuery(internal.queries.checkEmailAccess, {
        email,
      });

      if (!hasAccess) {
        await ctx.runMutation(api.mutations.logIntruder, {
          email,
          name: (profile.name as string) ?? "Anonymous",
          image: profile.image as string | undefined,
        });
      }
    },
  },
});
