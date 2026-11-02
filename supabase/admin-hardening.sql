-- Run in Supabase SQL editor. Order matters: step 1 BEFORE deploying the app change, or you lock yourself out.

-- 1. Mark your admin account (app_metadata is not user-editable). Replace the email, then log out and in again.
update auth.users
set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || '{"role":"admin"}'
where email = 'YOUR_ADMIN_EMAIL';

-- 2. Inspect current policies, then DROP any that let anon/authenticated write (policies are OR-ed, so old ones override these).
select schemaname, tablename, policyname, roles, cmd, qual, with_check
from pg_policies
where tablename in ('projects','blog_posts','site_settings','testimonials','contact_messages')
   or (schemaname = 'storage' and tablename = 'objects');

-- 3. Admin-only writes on content tables.
create or replace function public.is_admin() returns boolean
language sql stable as $$ select coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'admin' $$;

do $$
declare t text;
begin
  foreach t in array array['projects','blog_posts','site_settings','testimonials'] loop
    execute format('drop policy if exists admin_write on public.%I', t);
    execute format('create policy admin_write on public.%I for all to authenticated using (public.is_admin()) with check (public.is_admin())', t);
  end loop;
end $$;

-- Inbox: only admin reads/deletes (keep your existing anon INSERT policy for the contact form).
drop policy if exists admin_read on public.contact_messages;
create policy admin_read on public.contact_messages for select to authenticated using (public.is_admin());

-- 4. Storage 'uploads' bucket: public read stays, writes admin-only, with type and size limits.
update storage.buckets
set file_size_limit = 5242880, allowed_mime_types = array['image/png','image/jpeg','image/webp']
where id = 'uploads';

drop policy if exists uploads_admin_write on storage.objects;
create policy uploads_admin_write on storage.objects for all to authenticated
  using (bucket_id = 'uploads' and public.is_admin())
  with check (bucket_id = 'uploads' and public.is_admin());

-- 5. Dashboard: Auth -> Sign In / Providers -> turn OFF "Allow new users to sign up".
