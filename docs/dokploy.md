# Dokploy setup & build guidance

If you're deploying using Dokploy and want maximum build speed, build from the repository `Dockerfile`.

Recommended Dokploy configuration:

- **Build type**: Dockerfile

- **Environment variables (secret)**: `CONVEX_SELF_HOSTED_ADMIN_KEY`

Notes:

- Add your `CONVEX_SELF_HOSTED_ADMIN_KEY` as a secret in Dokploy settings — avoid adding it to `.env.local`.

No custom build command is required when using Dockerfile builds.
