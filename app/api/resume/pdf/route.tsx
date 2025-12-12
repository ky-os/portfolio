import { renderToStream } from '@react-pdf/renderer';
import ResumeDocument from '@/app/components/ResumeDocument';
import { NextResponse } from 'next/server';
import { getConvexHttpClient } from '@/lib/convex';
import { api } from '@/convex/_generated/api';

export async function GET() {
    const convex = getConvexHttpClient();
    const skillsData = await convex.query(api.queries.getSkills);

    // Transform the skills data into the format expected by ResumeDocument
    const skills = {
        languages: skillsData.find(s => s.category === "languages")?.items.map(i => i.name) || [],
        frameworks: skillsData.find(s => s.category === "frameworks")?.items.map(i => i.name) || [],
        tools: skillsData.find(s => s.category === "tools")?.items.map(i => i.name) || [],
    };

    const stream = await renderToStream(<ResumeDocument skills={skills} />);

    return new NextResponse(stream as unknown as BodyInit, {
        headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename="Kyle_Osunero_Resume.pdf"',
        },
    });
}
