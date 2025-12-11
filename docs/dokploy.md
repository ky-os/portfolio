# Dokploy setup & build guidance

If you're deploying using Dokploy, use the `tools/dokploy-build.sh` script as the build command.

Recommended Dokploy configuration:

- **Build command**: `bash ./tools/dokploy-build.sh`

- **Environment variables (secret)**: `CONVEX_SELF_HOSTED_ADMIN_KEY`, `GHCR_TOKEN` (for login/push when necessary)

- **Optional environment variables**:

  - `CACHE_FROM_IMAGE`: previous build image to seed cache (defaults to ghcr.io/ky-os/portfolio-app-mjoyxf:latest)


Notes:

- The `tools/dokploy-build.sh` script runs `nixpacks build` with `--inline-cache` and `--cache-from` where available. This reduces install time and speeds repeated builds.

- Make sure your Dokploy runner has `git` installed and that Dokploy keeps `HEAD` available to compute `--cache-key` from latest commit. If `git rev-parse` is unavailable, the script uses a timestamp fallback.

- Add your `CONVEX_SELF_HOSTED_ADMIN_KEY` as a secret in Dokploy settings — avoid adding it to `.env.local`.


Example build command with environment overrides (CI):

```bash
# set cache-from to a prior image and let the wrapper do the rest
export CACHE_FROM_IMAGE=ghcr.io/ky-os/portfolio-app-mjoyxf:v8
bash ./tools/dokploy-build.sh
```
