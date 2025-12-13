import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
} from "@convex-dev/auth/nextjs/server";
import { NextResponse } from "next/server";

const isAdminLanding = createRouteMatcher(["/admin"]);
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

const convexUrl =
  process.env.CONVEX_SELF_HOSTED_URL ?? process.env.NEXT_PUBLIC_CONVEX_URL;

if (!convexUrl) {
  throw new Error(
    "Missing Convex URL. Set CONVEX_SELF_HOSTED_URL (recommended) or NEXT_PUBLIC_CONVEX_URL."
  );
}

export const proxy = convexAuthNextjsMiddleware(
  async (request, { convexAuth }) => {
    if (!isAdminRoute(request)) return;

    // Let the admin landing page render the SignIn UI to avoid redirect loops.
    if (isAdminLanding(request)) return;

    if (!(await convexAuth.isAuthenticated())) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin";
      url.searchParams.set(
        "redirect",
        request.nextUrl.pathname + request.nextUrl.search
      );
      return NextResponse.redirect(url);
    }
  },
  {
    convexUrl,
    verbose: process.env.CONVEX_AUTH_VERBOSE === "true",
  }
);

export const config = {
  matcher: ["/api/auth/:path*", "/admin/:path*", "api/admin"],
};
