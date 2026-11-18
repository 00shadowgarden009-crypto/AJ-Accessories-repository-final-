-- AJ ACCERSSORES Phase 4 database foundation
create extension if not exists "pgcrypto";

create type public.user_role as enum ('customer', 'admin', 'staff');
create type public.order_status as enum ('received', 'confirmed', 'processing', 'dispatched', 'out_for_delivery', 'delivered', 'cancelled');
create type public.payment_status as enum ('pending', 'verified', 'failed', 'refunded');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role public.user_role not null default 'customer',
  full_name text,
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text,
  image_url text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.categories(id) on delete set null,
  name text not null,
  slug text unique not null,
  short_description text,
  description text,
  sku text unique,
  price_pkr integer not null check (price_pkr >= 0),
  original_price_pkr integer check (original_price_pkr is null or original_price_pkr >= 0),
  stock_quantity integer not null default 0 check (stock_quantity >= 0),
  low_stock_threshold integer not null default 5 check (low_stock_threshold >= 0),
  is_active boolean not null default true,
  is_featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  image_url text not null,
  alt_text text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table public.product_variations (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  name text not null,
  sku text unique,
  price_pkr integer check (price_pkr is null or price_pkr >= 0),
  stock_quantity integer not null default 0 check (stock_quantity >= 0),
  attributes jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table public.addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  full_name text not null,
  phone text not null,
  email text,
  address_line text not null,
  city text not null,
  postal_code text,
  instructions text,
  is_default boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text unique not null,
  user_id uuid references auth.users(id) on delete set null,
  status public.order_status not null default 'received',
  subtotal_pkr integer not null check (subtotal_pkr >= 0),
  discount_pkr integer not null default 0 check (discount_pkr >= 0),
  delivery_pkr integer not null default 0 check (delivery_pkr >= 0),
  total_pkr integer not null check (total_pkr >= 0),
  customer_name text not null,
  customer_phone text not null,
  customer_email text,
  shipping_address text not null,
  shipping_city text not null,
  shipping_postal_code text,
  shipping_instructions text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  variation_id uuid references public.product_variations(id) on delete set null,
  product_name text not null,
  variation_name text,
  unit_price_pkr integer not null check (unit_price_pkr >= 0),
  quantity integer not null check (quantity > 0),
  line_total_pkr integer not null check (line_total_pkr >= 0)
);

create table public.payments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid unique not null references public.orders(id) on delete cascade,
  provider text not null,
  provider_reference text,
  amount_pkr integer not null check (amount_pkr >= 0),
  status public.payment_status not null default 'pending',
  verified_at timestamptz,
  raw_payload jsonb,
  created_at timestamptz not null default now()
);

create table public.inventory_history (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references public.products(id) on delete set null,
  variation_id uuid references public.product_variations(id) on delete set null,
  quantity_delta integer not null,
  reason text not null,
  order_id uuid references public.orders(id) on delete set null,
  adjusted_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create table public.wishlists (
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, product_id)
);

create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  order_id uuid references public.orders(id) on delete set null,
  rating integer not null check (rating between 1 and 5),
  title text,
  body text,
  is_verified boolean not null default false,
  is_approved boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.coupons (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  description text,
  kind text not null check (kind in ('percentage', 'fixed')),
  value integer not null check (value > 0),
  minimum_order_pkr integer not null default 0,
  usage_limit integer,
  used_count integer not null default 0,
  starts_at timestamptz,
  ends_at timestamptz,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.flash_sales (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  discount_percentage integer not null check (discount_percentage between 1 and 90),
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.website_settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  title text not null,
  body text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

create index on public.products(category_id);
create index on public.products(is_active, is_featured);
create index on public.orders(status);
create index on public.orders(created_at desc);
create index on public.order_items(order_id);
create index on public.reviews(product_id, is_approved);

alter table public.profiles enable row level security;
alter table public.addresses enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.wishlists enable row level security;
alter table public.reviews enable row level security;
alter table public.notifications enable row level security;

create or replace function public.is_admin()
returns boolean language sql security definer set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role in ('admin', 'staff'))
$$;

create policy "Profiles are self-readable" on public.profiles for select using (auth.uid() = id or public.is_admin());
create policy "Profiles are self-updatable" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);
create policy "Addresses are owner-readable" on public.addresses for select using (auth.uid() = user_id or public.is_admin());
create policy "Addresses are owner-managed" on public.addresses for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Orders are owner-readable" on public.orders for select using (auth.uid() = user_id or public.is_admin());
create policy "Order items follow order visibility" on public.order_items for select using (exists (select 1 from public.orders o where o.id = order_id and (o.user_id = auth.uid() or public.is_admin())));
create policy "Wishlists are owner-managed" on public.wishlists for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Approved reviews are public" on public.reviews for select using (is_approved = true or auth.uid() = user_id or public.is_admin());
create policy "Customers can create reviews" on public.reviews for insert with check (auth.uid() = user_id);
create policy "Notifications are owner-readable" on public.notifications for select using (auth.uid() = user_id or public.is_admin());

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name) values (new.id, coalesce(new.raw_user_meta_data->>'full_name', ''));
  return new;
end;
$$;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();
