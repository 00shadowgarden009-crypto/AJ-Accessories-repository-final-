-- Apply after schema.sql
insert into storage.buckets (id, name, public) values ('product-images', 'product-images', true), ('uploads', 'uploads', false)
on conflict (id) do update set public = excluded.public;

create policy "Public product images" on storage.objects for select using (bucket_id = 'product-images');
create policy "Admins upload product images" on storage.objects for insert with check (bucket_id = 'product-images' and public.is_admin());
create policy "Admins update product images" on storage.objects for update using (bucket_id = 'product-images' and public.is_admin()) with check (bucket_id = 'product-images' and public.is_admin());
create policy "Admins delete product images" on storage.objects for delete using (bucket_id = 'product-images' and public.is_admin());
