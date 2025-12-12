import { generateMarkdown } from '@/lib/resume-utils';
import { NextResponse } from 'next/server';
import { getConvexHttpClient } from '@/lib/convex';
import { api } from '@/convex/_generated/api';

export async function GET() {
    const convex = getConvexHttpClient();
    const projects = await convex.query(api.queries.getProjects);
    const featuredCompany = await convex.query(api.queries.getFeaturedCompany);

    if (!featuredCompany) {
        return new NextResponse("Featured company data missing", { status: 500 });
    }

    const md = generateMarkdown(projects, featuredCompany);

    return new NextResponse(md, {
        headers: {
            'Content-Type': 'text/markdown',
            'Content-Disposition': 'attachment; filename="Kyle_Osunero_Resume.md"',
        },
    });
}
