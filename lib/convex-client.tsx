"use client";

import { ConvexAuthNextjsProvider } from "@convex-dev/auth/nextjs";
import { ConvexReactClient } from "convex/react";
import type { ReactNode } from "react";

function getConvexUrl(): string | null {
  return process.env.NEXT_PUBLIC_CONVEX_URL ?? null;
}

let convexClient: ConvexReactClient | null | undefined;

function getConvexClient(): ConvexReactClient | null {
  if (convexClient !== undefined) return convexClient;

  const url = getConvexUrl();
  convexClient = url ? new ConvexReactClient(url) : null;
  return convexClient;
}

export function ConvexClientProvider({
  children,
}: {
  children: ReactNode;
}) {
  const client = getConvexClient();

  if (!client) {
    if (typeof window !== "undefined") {
      return (
        <div style={{ padding: 16 }}>
          Missing <code>NEXT_PUBLIC_CONVEX_URL</code>. Set it in your deployment
          environment.
        </div>
      );
    }
    return <>{children}</>;
  }

  return <ConvexAuthNextjsProvider client={client}>{children}</ConvexAuthNextjsProvider>;
}