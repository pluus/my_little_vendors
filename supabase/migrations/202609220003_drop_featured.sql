-- "featured" was never read anywhere on the site; drop the dead column.
alter table public.businesses drop column if exists featured;
