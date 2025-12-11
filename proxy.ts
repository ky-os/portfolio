import { NextRequest, NextResponse } from "next/server";
import { getAuthToken } from "@/lib/get-auth-token";

// Protect admin routes and allow prefetch to pass through.
export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Routes that are safe to prefetch even when unauthenticated.

  // Only guard admin routes (allow access page to remain publicly accessible).
  if (!pathname.startsWith("/admin")) return NextResponse.next();
  // Allow the admin access/login page without auth to avoid redirect loops.
  if (pathname.startsWith("/admin/access")) {
    // If user is at /admin and unauthenticated show the access page instead.
    // Let the access page handle redirects or login UI.
    return NextResponse.next();
  }

  // Detect prefetch headers from Next.js and browsers; be permissive about header names.
  const isPrefetch =
    req.headers.get("purpose") === "prefetch" ||
    req.headers.get("sec-purpose") === "prefetch" ||
    req.headers.has("next-router-prefetch") ||
    req.headers.has("x-nextjs-prefetch") ||
    req.headers.has("x-purpose");

  // Allow all prefetch requests to pass through without redirecting or short-circuiting.
  if (isPrefetch) {
    return NextResponse.next();
  }

  // Retrieve token after prefetch checks — this uses Next.js cookie store safely.
  let token: string | undefined = undefined;
  try {
    token = await getAuthToken();
  } catch {
    token = undefined;
  }

  if (!token && !isPrefetch) {
    // Redirect unauthorized users to the admin access (login) page.
    // Preserve requested path for optional redirect after sign-in.
    const signInUrl = new URL("/admin/access", req.nextUrl);
    signInUrl.searchParams.set(
      "redirect",
      req.nextUrl.pathname + req.nextUrl.search
    );
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
