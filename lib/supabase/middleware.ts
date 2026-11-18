import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function updateSession(request: Request) {
  let response = NextResponse.next({ request });
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return (response as any).cookies.getAll(); },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            (response as any).cookies.set(name, value, options);
          });
        }
      }
    }
  );
  await supabase.auth.getUser();
  return response;
}
