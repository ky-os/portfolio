import { renderToStream } from '@react-pdf/renderer';
import ResumeDocument from '@/app/components/ResumeDocument';
import { NextResponse } from 'next/server';
import { convex } from '@/lib/convex';
import { api } from '@/convex/_generated/api';

export async function GET() {
    const skillsData = await convex.query(api.queries.getSkills);
    
    // Transform the skills data into the format expected by ResumeDocument
    const skills = {
        languages: skillsData.find(s => s.category === "languages")?.items || [],
        frameworks: skillsData.find(s => s.category === "frameworks")?.items || [],
        tools: skillsData.find(s => s.category === "tools")?.items || [],
    };

    const stream = await renderToStream(<ResumeDocument skills={skills} />);

    return new NextResponse(stream as unknown as BodyInit, {
        headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename="Kyle_Osunero_Resume.pdf"',
        },
    });
}
