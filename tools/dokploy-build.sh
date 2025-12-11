#!/usr/bin/env bash
set -euo pipefail

# Dokploy build wrapper that runs Nixpacks with caching enabled
# Usage: ./tools/dokploy-build.sh [--cache-from <image>]

REPO_IMAGE="ghcr.io/ky-os/portfolio-app-mjoyxf:latest"
CACHE_FROM_IMAGE="${CACHE_FROM_IMAGE:-$REPO_IMAGE}"
CACHE_KEY="$(git rev-parse --short HEAD 2>/dev/null || echo "$(date +%s)")"

INLINE_CACHE_ARGS=(--inline-cache --cache-key "$CACHE_KEY")
if [[ -n "$CACHE_FROM_IMAGE" ]]; then
    INLINE_CACHE_ARGS+=(--cache-from "$CACHE_FROM_IMAGE")
fi

echo "Using Nixpacks build with cache key: $CACHE_KEY"
echo "Cache-from image: $CACHE_FROM_IMAGE"

# Run build
nixpacks build "${INLINE_CACHE_ARGS[@]}"

echo "Nixpacks build completed"

EXIT_CODE=0
exit $EXIT_CODE
