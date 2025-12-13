// convex/auth.config.ts
const authConfig = {
  providers: [
    {
      // Convex Auth expects SITE_URL to be set in the Convex deployment env.
      // Keep CONVEX_SITE_URL as a backwards-compatible fallback.
      domain: process.env.SITE_URL ?? process.env.CONVEX_SITE_URL,
      applicationID: "convex",
    },
  ],
};

export default authConfig;