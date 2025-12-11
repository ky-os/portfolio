import { preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import IntruderList from "@/app/components/IntruderList";

export default async function IntruderPage() {
    const preloadedIntruders = await preloadQuery(api.queries.getIntruders);

    return <IntruderList preloadedIntruders={preloadedIntruders} />;
}
