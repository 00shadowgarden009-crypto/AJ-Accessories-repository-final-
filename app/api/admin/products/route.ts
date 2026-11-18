import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', auth.user.id).maybeSingle();
  if (profile?.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const body = await request.json().catch(() => null);
  if (!body?.name || !body?.slug || !Number.isFinite(body?.price_pkr)) {
    return NextResponse.json({ error: 'Name, slug and PKR price are required' }, { status: 400 });
  }
  const payload = {
    name: String(body.name).slice(0, 200), slug: String(body.slug).toLowerCase().trim().slice(0, 200),
    short_description: body.short_description ? String(body.short_description).slice(0, 300) : null,
    description: body.description ? String(body.description).slice(0, 10000) : null,
    sku: body.sku ? String(body.sku).slice(0, 100) : null,
    price_pkr: Math.max(0, Math.floor(body.price_pkr)),
    original_price_pkr: body.original_price_pkr ? Math.max(0, Math.floor(body.original_price_pkr)) : null,
    stock_quantity: body.stock_quantity ? Math.max(0, Math.floor(body.stock_quantity)) : 0,
    is_active: body.is_active !== false, is_featured: body.is_featured === true
  };
  const { data, error } = await supabase.from('products').insert(payload).select('id,slug').single();
  if (error) return NextResponse.json({ error: 'Product could not be created' }, { status: 409 });
  return NextResponse.json({ product: data }, { status: 201 });
}
