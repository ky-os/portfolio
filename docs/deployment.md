Deployment & Build Performance Tips
----------------------------------

This repo uses Nixpacks for building images. To speed builds and reduce the amount of work done on every push, follow these recommendations:

- Use build cache with Nixpacks inline cache (on build command):

```sh
nixpacks build --inline-cache --cache-key $(git rev-parse --short HEAD)
```

- Reuse an inline cache for faster build by passing `--cache-from` with the image id or previous build image.
- Run the Convex deploy only when convex code changes. The `nixpacks.toml` now places the deploy step in its own phase limited to `convex/**`.
- Add your Convex admin key and other secrets to your hosting provider's secret manager or CI variables. Avoid putting secrets in `.env.local` (already removed from repo). Use `CONVEX_SELF_HOSTED_ADMIN_KEY` from your provider’s Secret system and not in source control.
- Use `start.onlyIncludeFiles` and `start.runImage` in `nixpacks.toml` to reduce final runtime image size.

If you use Dokploy or Railway, prefer to configure the `nixpacks build` CLI options there to pass `--inline-cache` and `--cache-from`.

Notes:
- For sensitive data already committed to history, use git history rewrite tools (BFG or git-filter-repo) if you want to remove secrets from prior commits.
- When testing locally, use `nixpacks build` twice to verify caching behavior — second run should be faster.

