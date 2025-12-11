import { preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import IntruderList from "@/app/components/IntruderList";

import { getAuthToken } from '@/lib/get-auth-token';

export default async function IntruderPage() {
    const token = await getAuthToken();

    const preloadedIntruders = await preloadQuery(api.queries.getIntruders, undefined, { token });

    return <IntruderList preloadedIntruders={preloadedIntruders} />;
}
