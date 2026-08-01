-- PureHabitat — Supabase schema
-- Run this in the Supabase SQL editor (or via the CLI) to provision the
-- `enquiries` table used by the enquiry form.
--
-- One table holds both branches of the form:
--   enquiry_type = 'refer'  → a professional joining the Referral Network
--                             (company, profession, website are populated)
--   enquiry_type = 'own'    → someone who wants the system in their own space
--                             (space_type, area_sqft are populated)
--
-- Replaces the earlier `partner_applications` table. If you already collected
-- rows there, copy them across before dropping it — see the bottom of this file.

create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  enquiry_type text not null check (enquiry_type in ('refer', 'own')),

  -- shared
  name text not null,
  email text not null,
  phone text not null,
  city text not null,
  message text,

  -- enquiry_type = 'refer'
  company text,
  profession text,
  website text,

  -- enquiry_type = 'own'
  space_type text,
  area_sqft text,

  status text not null default 'new'
);

alter table public.enquiries enable row level security;

-- Allow anonymous visitors to submit an enquiry (INSERT only).
drop policy if exists "Public can submit enquiries" on public.enquiries;
create policy "Public can submit enquiries"
  on public.enquiries
  for insert
  to anon
  with check (true);

-- Reads/updates are restricted to authenticated staff (internal inbox, phase 1).
drop policy if exists "Authenticated can read enquiries" on public.enquiries;
create policy "Authenticated can read enquiries"
  on public.enquiries
  for select
  to authenticated
  using (true);

create index if not exists enquiries_created_at_idx
  on public.enquiries (created_at desc);

create index if not exists enquiries_type_idx
  on public.enquiries (enquiry_type, created_at desc);

-- ---------------------------------------------------------------------------
-- Optional migration from the old table. Run once, then drop the old table.
-- ---------------------------------------------------------------------------
-- insert into public.enquiries
--   (created_at, enquiry_type, name, email, phone, city, message,
--    company, profession, website, status)
-- select
--   created_at, 'refer', name, email, phone, city, message,
--   company, business_type, website, status
-- from public.partner_applications;
--
-- drop table public.partner_applications;
