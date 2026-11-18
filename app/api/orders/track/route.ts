import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const orderNumber = body?.orderNumber?.trim();
  const phone = body?.phone?.trim();
  if (!orderNumber || !phone) return NextResponse.json({ error: 'Order number and phone are required' }, { status: 400 });
  return NextResponse.json({ error: 'Order tracking database is not yet provisioned' }, { status: 503 });
}
