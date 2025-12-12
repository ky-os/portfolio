import "server-only";
import { ConvexHttpClient } from "convex/browser";

function getConvexUrl(): string {
	// Server-side: prefer CONVEX_SELF_HOSTED_URL. Fallbacks allow simpler setups.
	const url =
		process.env.CONVEX_SELF_HOSTED_URL ??
		process.env.NEXT_PUBLIC_CONVEX_URL;

	if (!url) {
		throw new Error(
			"Missing Convex URL. Set CONVEX_SELF_HOSTED_URL (recommended) or NEXT_PUBLIC_CONVEX_URL.",
		);
	}

	return url;
}


export function getConvexHttpClient(): ConvexHttpClient {
	return new ConvexHttpClient(getConvexUrl());
}
