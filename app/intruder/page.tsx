import { preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import IntruderList from "@/app/components/IntruderList";

import {
    convexAuthNextjsToken,
    isAuthenticatedNextjs,
} from "@convex-dev/auth/nextjs/server";
import { redirect } from "next/navigation";

export default async function IntruderPage() {
    const isAuthenticated = await isAuthenticatedNextjs();
    if (!isAuthenticated) redirect("/admin");

    const token = await convexAuthNextjsToken();

    const preloadedIntruders = await preloadQuery(api.queries.getIntruders, undefined, { token });

    return <IntruderList preloadedIntruders={preloadedIntruders} />;
}
