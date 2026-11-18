import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { data, error } = await supabase.from('wishlist_items').select('*, products(*)').eq('user_id', auth.user.id).order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error: 'Wishlist unavailable' }, { status: 503 });
  return NextResponse.json({ wishlist: data ?? [] });
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await request.json().catch(() => null);
  if (!body?.productId) return NextResponse.json({ error: 'Product is required' }, { status: 400 });
  const { error } = await supabase.from('wishlist_items').upsert({ user_id: auth.user.id, product_id: body.productId }, { onConflict: 'user_id,product_id' });
  if (error) return NextResponse.json({ error: 'Could not update wishlist' }, { status: 409 });
  return NextResponse.json({ saved: true }, { status: 201 });
}

export async function DELETE(request: Request) {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await request.json().catch(() => null);
  if (!body?.productId) return NextResponse.json({ error: 'Product is required' }, { status: 400 });
  const { error } = await supabase.from('wishlist_items').delete().eq('user_id', auth.user.id).eq('product_id', body.productId);
  if (error) return NextResponse.json({ error: 'Could not update wishlist' }, { status: 409 });
  return NextResponse.json({ removed: true });
}
