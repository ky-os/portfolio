# Dokploy setup & build guidance

If you're deploying using Dokploy, use `nixpacks build` as the build command.

Recommended Dokploy configuration:

- **Build command**: `nixpacks build`

- **Environment variables (secret)**: `CONVEX_SELF_HOSTED_ADMIN_KEY`

Notes:

- Add your `CONVEX_SELF_HOSTED_ADMIN_KEY` as a secret in Dokploy settings — avoid adding it to `.env.local`.

Example build command:

```bash
nixpacks build
```
