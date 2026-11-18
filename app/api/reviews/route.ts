import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await request.json().catch(() => null);
  if (!body?.productId || !body?.orderId || !Number.isInteger(body?.rating) || body.rating < 1 || body.rating > 5) {
    return NextResponse.json({ error: 'Product, order and rating from 1 to 5 are required' }, { status: 400 });
  }
  const { data: order } = await supabase.from('orders').select('id,status,user_id').eq('id', body.orderId).eq('user_id', auth.user.id).maybeSingle();
  if (!order || order.status !== 'delivered') return NextResponse.json({ error: 'Reviews require a delivered order' }, { status: 403 });
  const { error } = await supabase.from('reviews').insert({
    user_id: auth.user.id, product_id: body.productId, order_id: body.orderId,
    rating: body.rating, title: body.title ? String(body.title).slice(0, 150) : null,
    body: body.body ? String(body.body).slice(0, 3000) : null,
    is_verified_purchase: true, is_approved: false
  });
  if (error) return NextResponse.json({ error: 'Review could not be submitted' }, { status: 409 });
  return NextResponse.json({ submitted: true }, { status: 201 });
}
