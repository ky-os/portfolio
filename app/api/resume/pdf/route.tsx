import { renderToStream } from '@react-pdf/renderer';
import ResumeDocument from '@/app/components/ResumeDocument';
import { NextResponse } from 'next/server';

export async function GET() {
    const stream = await renderToStream(<ResumeDocument />);

    return new NextResponse(stream as unknown as BodyInit, {
        headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename="Kyle_Osunero_Resume.pdf"',
        },
    });
}
