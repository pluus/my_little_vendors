-- Lets admins create a business as a private draft (from an application)
-- and finish editing logo/description/contact before it goes public.
alter table public.businesses
  add column if not exists published boolean not null default true;
