import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
} from "@convex-dev/auth/nextjs/server";
import { NextResponse } from "next/server";

const isAdminLanding = createRouteMatcher(["/admin"]);
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export const proxy = convexAuthNextjsMiddleware(async (request, { convexAuth }) => {
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
});

export const config = {
  matcher: [
    {
      source: "/admin/:path*",
    },
  ],
};
