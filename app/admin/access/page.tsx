import React from "react";
import { SectionHeader } from "@/app/components/ui/SectionHeader";
import WhitelistManager from "@/app/components/admin/WhitelistManager";

export default function AccessControlPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <SectionHeader
                title="Access Control"
                subtitle="Manage whitelisted users who can access the admin dashboard."
                className="mb-8"
            />
            <WhitelistManager />
        </div>
    );
}

