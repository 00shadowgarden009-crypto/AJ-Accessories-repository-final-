import { NextResponse } from 'next/server';
import { normalizeEmail } from '@/lib/newsletter';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = normalizeEmail(body?.email);
  if (!email) return NextResponse.json({ error: 'Enter a valid email address' }, { status: 400 });
  const supabase = await createClient();
  const { error } = await supabase.from('newsletter_subscribers').upsert({ email, is_subscribed: true, subscribed_at: new Date().toISOString() }, { onConflict: 'email' });
  if (error) return NextResponse.json({ error: 'Signup could not be completed' }, { status: 503 });
  return NextResponse.json({ subscribed: true });
}
