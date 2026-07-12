-- PureHabitat — Supabase schema
-- Run this in the Supabase SQL editor (or via the CLI) to provision the
-- partner_applications table used by the "Become a Partner" form.

create table if not exists public.partner_applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  company text not null,
  email text not null,
  phone text not null,
  business_type text not null,
  city text not null,
  website text,
  message text,
  status text not null default 'new'
);

alter table public.partner_applications enable row level security;

-- Allow anonymous visitors to submit an application (INSERT only).
drop policy if exists "Public can submit applications" on public.partner_applications;
create policy "Public can submit applications"
  on public.partner_applications
  for insert
  to anon
  with check (true);

-- Reads/updates are restricted to authenticated staff (dashboard, phase 1).
drop policy if exists "Authenticated can read applications" on public.partner_applications;
create policy "Authenticated can read applications"
  on public.partner_applications
  for select
  to authenticated
  using (true);

create index if not exists partner_applications_created_at_idx
  on public.partner_applications (created_at desc);
