import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || !Array.isArray(body.items) || body.items.length === 0) {
    return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
  }
  if (!body.fullName || !body.phone || !body.address || !body.city) {
    return NextResponse.json({ error: 'Required delivery details are missing' }, { status: 400 });
  }
  if (!['cod', 'bank', 'gateway'].includes(body.paymentMethod)) {
    return NextResponse.json({ error: 'Invalid payment method' }, { status: 400 });
  }

  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  const { data, error } = await supabase.rpc('create_order', {
    p_user_id: auth.user?.id ?? null,
    p_customer_name: String(body.fullName).slice(0, 120),
    p_customer_phone: String(body.phone).slice(0, 30),
    p_customer_email: body.email ? String(body.email).slice(0, 180) : null,
    p_address: String(body.address).slice(0, 300),
    p_city: String(body.city).slice(0, 100),
    p_postal_code: body.postalCode ? String(body.postalCode).slice(0, 20) : null,
    p_instructions: body.instructions ? String(body.instructions).slice(0, 500) : null,
    p_items: body.items,
    p_payment_method: body.paymentMethod
  });
  if (error) return NextResponse.json({ error: 'Order could not be created' }, { status: 409 });
  return NextResponse.json({ order: data }, { status: 201 });
}
