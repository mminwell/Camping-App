-- 4th of July Shit Show — camping.reservations
-- Run this in the Supabase SQL Editor on the shared Minwell Apps project
-- (Dashboard → SQL → New query → Run).
-- Also add `camping` to that project's API exposed schemas.

create extension if not exists "pgcrypto";

create schema if not exists camping;

-- public is exposed to the API roles by default; a dedicated schema is not.
grant usage on schema camping to anon, authenticated, service_role;

create table if not exists camping.reservations (
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
  on camping.reservations (created_at);

grant select, insert, update, delete on table camping.reservations
  to anon, authenticated, service_role;

-- This is a small, trusted, private group with no login. Enable RLS but allow
-- the anon role full CRUD. (Tighten later in Phase 2 if needed.)
alter table camping.reservations enable row level security;

drop policy if exists "anon_select_reservations" on camping.reservations;
drop policy if exists "anon_insert_reservations" on camping.reservations;
drop policy if exists "anon_update_reservations" on camping.reservations;
drop policy if exists "anon_delete_reservations" on camping.reservations;

create policy "anon_select_reservations"
  on camping.reservations for select
  to anon using (true);

create policy "anon_insert_reservations"
  on camping.reservations for insert
  to anon with check (true);

create policy "anon_update_reservations"
  on camping.reservations for update
  to anon using (true) with check (true);

create policy "anon_delete_reservations"
  on camping.reservations for delete
  to anon using (true);
