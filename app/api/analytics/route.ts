import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const event = body?.event;
  const allowed = new Set(['page_view','product_view','add_to_cart','begin_checkout','purchase','search','newsletter_signup']);
  if (!event || typeof event !== 'string' || !allowed.has(event)) {
    return NextResponse.json({ error: 'Invalid analytics event' }, { status: 400 });
  }
  if (Object.keys(body).length > 20) return NextResponse.json({ error: 'Payload too large' }, { status: 413 });
  return NextResponse.json({ accepted: true });
}
