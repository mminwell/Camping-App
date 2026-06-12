-- 4th of July Shit Show — reservations schema
-- Run this in the Supabase SQL Editor (Dashboard → SQL → New query → Run).

create extension if not exists "pgcrypto";

create table if not exists public.reservations (
  id            uuid primary key default gen_random_uuid(),
  first_name    text        not null,
  last_name     text        not null,
  email         text        not null,
  phone         text        not null,
  camper_length numeric     not null,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz
);

-- Keep newest-aware ordering fast.
create index if not exists reservations_created_at_idx
  on public.reservations (created_at);

-- This is a small, trusted, private group with no login. Enable RLS but allow
-- the anon role full CRUD. (Tighten later in Phase 2 if needed.)
alter table public.reservations enable row level security;

drop policy if exists "anon_select_reservations" on public.reservations;
drop policy if exists "anon_insert_reservations" on public.reservations;
drop policy if exists "anon_update_reservations" on public.reservations;
drop policy if exists "anon_delete_reservations" on public.reservations;

create policy "anon_select_reservations"
  on public.reservations for select
  to anon using (true);

create policy "anon_insert_reservations"
  on public.reservations for insert
  to anon with check (true);

create policy "anon_update_reservations"
  on public.reservations for update
  to anon using (true) with check (true);

create policy "anon_delete_reservations"
  on public.reservations for delete
  to anon using (true);
