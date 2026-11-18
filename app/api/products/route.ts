export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const search = request.nextUrl.searchParams.get('q')?.trim() || '';
  const category = request.nextUrl.searchParams.get('category')?.trim() || '';

  let query = supabase
    .from('products')
    .select('id,name,slug,price_pkr,original_price_pkr,stock_quantity,is_featured,category:categories(name,slug),images:product_images(image_url,alt_text,sort_order)')
    .eq('is_active', true)
    .order('is_featured', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(100);

  if (search) query = query.or(`name.ilike.%${search}%,short_description.ilike.%${search}%,sku.ilike.%${search}%`);
  if (category) query = query.eq('category.slug', category);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: 'Catalog unavailable' }, { status: 503 });
  return NextResponse.json({ products: data ?? [] });
}
