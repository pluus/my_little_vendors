-- Admin dashboard schema: businesses, vendor applications, group buying events
-- Run via Supabase CLI: supabase db push

-- 1. businesses -----------------------------------------------------------
create table if not exists public.businesses (
  id bigint generated always as identity primary key,
  slug text unique not null,
  name text not null,
  description text,
  categories text[] not null default '{}',
  location text,
  tags text[] not null default '{}',
  cover text,
  images text[] not null default '{}',
  gallery text[] not null default '{}',
  hours text,
  website text,
  instagram text,
  kakao text,
  email text,
  phone text,
  featured boolean not null default false,
  is_placeholder boolean not null default true,
  fun_fact text,
  vendor_of_week boolean not null default false,
  vendor_name text,
  vendor_story text,
  vendor_quote text,
  vendor_journey text,
  vendor_passion text,
  vendor_image text,
  like_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- only one business can be "vendor of the week" at a time
create unique index if not exists businesses_one_vendor_of_week
  on public.businesses (vendor_of_week)
  where vendor_of_week;

drop trigger if exists businesses_set_updated_at on public.businesses;
create trigger businesses_set_updated_at
before update on public.businesses
for each row
execute function public.set_updated_at();

alter table public.businesses enable row level security;

drop policy if exists "Public can view businesses" on public.businesses;
create policy "Public can view businesses"
on public.businesses
for select
using (true);

-- inserts/updates/deletes go through the admin dashboard using the
-- service role key (server-side only), which bypasses RLS entirely.

-- 2. vendor_applications ---------------------------------------------------
create table if not exists public.vendor_applications (
  id bigint generated always as identity primary key,
  name text not null,
  location text not null,
  category text not null,
  description text not null,
  instagram text,
  contact_email text,
  tags text[] not null default '{}',
  status text not null default 'pending'
    check (status in ('pending', 'approved', 'rejected')),
  admin_note text,
  reviewed_by uuid references public.profiles(id),
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.vendor_applications enable row level security;

drop policy if exists "Anyone can submit an application" on public.vendor_applications;
create policy "Anyone can submit an application"
on public.vendor_applications
for insert
with check (true);

-- no select/update policy for anon/authenticated: only the admin
-- dashboard (service role key) can read or review submissions.

-- 3. group_buying_events ---------------------------------------------------
create table if not exists public.group_buying_events (
  id bigint generated always as identity primary key,
  title text not null,
  start_date date not null,
  end_date date not null,
  description text,
  link text,
  tag text,
  status text check (status in ('진행중', '마감', '예정')),
  photos text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists group_buying_events_set_updated_at on public.group_buying_events;
create trigger group_buying_events_set_updated_at
before update on public.group_buying_events
for each row
execute function public.set_updated_at();

alter table public.group_buying_events enable row level security;

drop policy if exists "Public can view group buying events" on public.group_buying_events;
create policy "Public can view group buying events"
on public.group_buying_events
for select
using (true);

-- 4. admin flag on profiles -------------------------------------------------
alter table public.profiles
  add column if not exists is_admin boolean not null default false;
