import { cookies as nextCookies } from 'next/headers';

/**
 * Return the Convex auth JWT token from cookies, or null.
 *
 * This helper awaits the Next.js cookie store and reads either
 * the `__Host-__convexAuthJWT` (preferred) or fallback `__convexAuthJWT`.
 */
export async function getAuthToken(): Promise<string | undefined> {
  const cookieStore = await nextCookies();
  const tokenCookie = cookieStore.get('__Host-__convexAuthJWT') ?? cookieStore.get('__convexAuthJWT');
  return tokenCookie?.value ?? undefined;
}

export default getAuthToken;
