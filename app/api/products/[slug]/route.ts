export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(_: Request, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('products')
    .select('*, category:categories(*), images:product_images(*), variations:product_variations(*)')
    .eq('slug', slug)
    .eq('is_active', true)
    .maybeSingle();

  if (error) return NextResponse.json({ error: 'Catalog unavailable' }, { status: 503 });
  if (!data) return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  return NextResponse.json({ product: data });
}
