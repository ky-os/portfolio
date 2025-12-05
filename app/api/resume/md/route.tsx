import { generateMarkdown } from '@/lib/resume-utils';
import { NextResponse } from 'next/server';

export async function GET() {
    const md = generateMarkdown();

    return new NextResponse(md, {
        headers: {
            'Content-Type': 'text/markdown',
            'Content-Disposition': 'attachment; filename="Kyle_Osunero_Resume.md"',
        },
    });
}
