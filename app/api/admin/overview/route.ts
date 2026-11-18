import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

async function requireAdmin() {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return { supabase, authorized: false };
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', auth.user.id).maybeSingle();
  return { supabase, authorized: profile?.role === 'admin' || profile?.role === 'staff' };
}

export async function GET() {
  const { supabase, authorized } = await requireAdmin();
  if (!authorized) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  const [orders, products, customers] = await Promise.all([
    supabase.from('orders').select('id,status,total_pkr,created_at').order('created_at', { ascending: false }).limit(20),
    supabase.from('products').select('id,name,stock_quantity,low_stock_threshold,is_active').order('updated_at', { ascending: false }).limit(20),
    supabase.from('profiles').select('id,role,created_at').order('created_at', { ascending: false }).limit(20)
  ]);
  return NextResponse.json({ orders: orders.data ?? [], products: products.data ?? [], customers: customers.data ?? [] });
}
