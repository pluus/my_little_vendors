-- Category taxonomy, moved out of the frontend static file.
create table if not exists public.categories (
  id bigint generated always as identity primary key,
  name text unique not null,
  sort_order int not null default 0
);

insert into public.categories (name, sort_order) values
  ('홈 & 리빙', 1),
  ('미용 & 건강', 2),
  ('이벤트', 3),
  ('식품', 4),
  ('교육', 5),
  ('주문제작', 6),
  ('IT', 7),
  ('기타', 8)
on conflict (name) do nothing;

alter table public.categories enable row level security;

drop policy if exists "Public can view categories" on public.categories;
create policy "Public can view categories"
on public.categories
for select
using (true);

-- Storage bucket for admin-uploaded business images.
insert into storage.buckets (id, name, public)
values ('business-images', 'business-images', true)
on conflict (id) do nothing;

drop policy if exists "Public can view business images" on storage.objects;
create policy "Public can view business images"
on storage.objects
for select
using (bucket_id = 'business-images');

-- uploads/updates/deletes go through the admin API using the service role
-- key, which bypasses storage RLS entirely.
