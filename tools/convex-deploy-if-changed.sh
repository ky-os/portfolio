#!/usr/bin/env bash
set -euo pipefail

if ! command -v git >/dev/null 2>&1; then
    echo "git not available; skipping Convex deploy."
    exit 0
fi

if git show --name-only --pretty="" HEAD -- convex | grep -q .; then
    echo "Convex changes detected. Deploying Convex functions."
    npx convex deploy
else
    echo "No Convex-related changes detected. Skipping Convex deploy."
fi
