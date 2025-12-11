import { NextRequest, NextResponse } from "next/server";
import { getAuthToken } from "@/lib/get-auth-token";

// Protect admin routes and allow prefetch to pass through.
export async function proxy(req: NextRequest) {
  const token = await getAuthToken();

  if (!token) {
    // Redirect unauthorized users to the admin access (login) page.
    // Preserve requested path for optional redirect after sign-in.
    const signInUrl = new URL("/admin", req.nextUrl);
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
