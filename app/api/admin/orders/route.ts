import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', auth.user.id).maybeSingle();
  if (profile?.role !== 'admin' && profile?.role !== 'staff') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const url = new URL(request.url);
  const status = url.searchParams.get('status');
  let query = supabase.from('orders').select('*').order('created_at', { ascending: false }).limit(100);
  if (status) query = query.eq('status', status);
  const { data, error } = await query;
  if (error) return NextResponse.json({ error: 'Orders unavailable' }, { status: 503 });
  return NextResponse.json({ orders: data ?? [] });
}

export async function PATCH(request: Request) {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', auth.user.id).maybeSingle();
  if (profile?.role !== 'admin' && profile?.role !== 'staff') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const body = await request.json().catch(() => null);
  if (!body?.orderId || !body?.status) return NextResponse.json({ error: 'Order and status are required' }, { status: 400 });
  const allowed = ['received','confirmed','processing','dispatched','out_for_delivery','delivered','cancelled'];
  if (!allowed.includes(body.status)) return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
  const { error } = await supabase.from('orders').update({ status: body.status, updated_at: new Date().toISOString() }).eq('id', body.orderId);
  if (error) return NextResponse.json({ error: 'Status update failed' }, { status: 409 });
  return NextResponse.json({ updated: true });
}
