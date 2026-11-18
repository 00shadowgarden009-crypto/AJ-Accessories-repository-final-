import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const supabase = await createClient();
  const url = new URL(request.url);
  const productId = url.searchParams.get('productId');
  if (!productId) return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
  const { data, error } = await supabase.from('reviews').select('id,rating,title,body,is_verified_purchase,created_at').eq('product_id', productId).eq('is_approved', true).order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error: 'Reviews unavailable' }, { status: 503 });
  return NextResponse.json({ reviews: data ?? [] });
}
