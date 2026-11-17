-- Run in the Supabase SQL editor BEFORE deploying the settings change.
-- Adds the business address and more social profiles to site_settings. Every column is optional:
-- the site shows a detail only when it is filled in.
alter table public.site_settings
  add column if not exists street_address text,
  add column if not exists city text,
  add column if not exists region text,
  add column if not exists postal_code text,
  add column if not exists country text,
  add column if not exists maps_url text,
  add column if not exists x_url text,
  add column if not exists facebook text,
  add column if not exists youtube text,
  add column if not exists tiktok text,
  add column if not exists dribbble text,
  add column if not exists behance text;
