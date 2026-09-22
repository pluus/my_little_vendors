alter table public.vendor_applications
  add column if not exists phone text,
  add column if not exists kakao text;
