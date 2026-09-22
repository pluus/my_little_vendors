alter table public.vendor_applications
  add column if not exists consent_media_use boolean not null default false;
