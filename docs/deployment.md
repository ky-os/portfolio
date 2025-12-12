# Deployment & Build Performance Tips

For maximum build speed and predictable caching, prefer building with the repository `Dockerfile`.

Dockerfile builds can take advantage of Docker BuildKit caching (including cached dependency installs and Next.js build cache) when supported by the host.

Notes:

- For sensitive data already committed to history, use git history rewrite tools (BFG or git-filter-repo) if you want to remove secrets from prior commits.
- When testing locally, build twice to verify caching behavior — second run should be faster.

