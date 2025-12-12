"use client";

import { ConvexAuthNextjsProvider } from "@convex-dev/auth/nextjs";
import { ConvexReactClient } from "convex/react";
import type { ReactNode } from "react";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
const convexClient: ConvexReactClient | null = convexUrl
  ? new ConvexReactClient(convexUrl)
  : null;

export function ConvexClientProvider({
  children,
}: {
  children: ReactNode;
}) {
  if (!convexClient) {
    if (typeof window === "undefined") return <>{children}</>;
    return (
      <div style={{ padding: 16 }}>
        Missing <code>NEXT_PUBLIC_CONVEX_URL</code>. Set it in your deployment
        environment.
      </div>
    );
  }

  return (
    <ConvexAuthNextjsProvider client={convexClient}>
      {children}
    </ConvexAuthNextjsProvider>
  );
}