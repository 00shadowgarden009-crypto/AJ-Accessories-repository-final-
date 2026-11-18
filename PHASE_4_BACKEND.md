# AJ ACCERSSORES — Phase 4

## Database setup

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the SQL editor.
3. Run `supabase/storage.sql` after enabling Storage.
4. Set `.env.local` using `.env.example`.

## Required environment variables

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (server-only)

Never expose the service-role key in browser code or `NEXT_PUBLIC_*` variables.

## Security

The database uses role-based profiles and row-level security. Public catalog reads remain server/API-driven. Customer records require authenticated ownership. Product, order and inventory writes must remain in privileged server functions or admin-only endpoints.
