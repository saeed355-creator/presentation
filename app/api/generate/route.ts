import { generateAIPresentation, generateFallbackOutline } from '@/lib/ai';
import { AudienceType, PurposeType, ToneType, ThemeType } from '@/lib/types';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      topic,
      audience = 'professional',
      purpose = 'meeting',
      slideCount = 8,
      tone = 'professional',
      theme = 'dark-violet',
      mode = 'full',
      outline = null,
    } = body;

    if (!topic || typeof topic !== 'string') {
      return NextResponse.json(
        { error: 'Topic string is required' },
        { status: 400 }
      );
    }

    if (mode === 'outline') {
      const generatedOutline = generateFallbackOutline(
        topic,
        audience as AudienceType,
        purpose as PurposeType,
        Number(slideCount) || 8
      );
      return NextResponse.json({ success: true, outline: generatedOutline });
    }

    const presentation = await generateAIPresentation(
      topic,
      audience as AudienceType,
      purpose as PurposeType,
      Number(slideCount) || 8,
      tone as ToneType,
      theme as ThemeType,
      outline
    );

    return NextResponse.json({ success: true, presentation });
  } catch (err: any) {
    console.error('API /generate error:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to generate presentation' },
      { status: 500 }
    );
  }
}
