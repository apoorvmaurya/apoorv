import { NextResponse } from 'next/server';
import { getResumeContext } from '@/lib/ai/resume-context';

/**
 * GET /api/resume
 * Get resume context (for debugging/testing)
 */
export async function GET() {
    try {
        const resumeContext = await getResumeContext();

        return NextResponse.json({
            success: true,
            data: {
                preview: resumeContext.text.substring(0, 500) + '...',
                metadata: resumeContext.metadata,
                length: resumeContext.text.length,
            },
        });
    } catch (error) {
        console.error('Resume API error:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to get resume context',
            },
            { status: 500 }
        );
    }
}
