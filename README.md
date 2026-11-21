# 4th of July Shit Show 🎆

A fun, premium, fully responsive reservation app for our private camping trip
(**July 2–6, 2026** — America's 250th). Reserve a spot, see who's coming, and
watch the per-camper cost drop as more rigs roll in. No login required; data
syncs across every device via Supabase.

> Fixed total trip cost: **$1,428.00**. Cost per camper = `1428 / number of campers`.

## Tech stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS v4** + **shadcn/ui** (base-nova)
- **Supabase** (Postgres) via `@supabase/supabase-js`
- **TanStack Query** for data fetching/caching + optimistic updates
- **react-hook-form** + **zod** for forms & validation
- **lucide-react** icons, **sonner** toasts, **canvas-confetti**

## Features

- Hero with big CTA, check-in/check-out, and a prominent **Cost Splitter** that
  recalculates live as campers join.
- **Who's Coming?** — a clean table on desktop/iPad, stacked cards on phones,
  with skeleton loading, empty, and error states.
- Reserve modal with full validation, phone auto-formatting, loading state,
  success toast, and a confetti burst.
- Edit (pre-filled modal) and Delete (confirmation dialog, optimistic removal).
- Accessible, keyboard-friendly, touch-friendly, light + dark aware.

## Demo mode vs. live

The app runs out of the box **without a database**: when Supabase env vars are
absent it stores reservations in your browser's `localStorage` and shows a
"Demo mode" banner. Add credentials (below) to go live and sync across devices.

## Local development

```bash
npm install
cp .env.example .env.local   # fill in your Supabase values (optional for demo)
npm run dev                  # http://localhost:3000
```

## Supabase setup (to go live)

The app uses the `camping` schema on the shared **Minwell Apps** Supabase
project. The table is `camping.reservations` (same columns as before). Env var
names stay `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

1. In the Minwell Apps project: **SQL Editor → New query**, paste the contents of
   [`supabase/schema.sql`](supabase/schema.sql), and **Run**. This creates the
   `camping` schema, the `camping.reservations` table, and permissive RLS
   policies for the `anon` role (fine for a small, trusted, no-login group).
2. **Project Settings → API → Exposed schemas** — add `camping`.
3. **Project Settings → API** → copy the **Project URL** and **anon public**
   key into `.env.local`:

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-ref.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

4. Restart `npm run dev`. The "Demo mode" banner disappears and data now syncs.

## Deploy to Vercel

1. Push this repo to GitHub.
2. In Vercel, **Add New → Project** and import the repo (framework auto-detected
   as Next.js).
3. Add the two `NEXT_PUBLIC_SUPABASE_*` environment variables (same values as
   `.env.local`) for **Production** (and Preview if you like).
4. **Deploy.**

## Data model

`camping.reservations` on the shared Minwell Apps project: `id` (uuid pk),
`first_name`, `last_name`, `email`, `phone`, `camper_length` (numeric),
`created_at`, `updated_at`.

## Project structure

```
app/            layout, page (client orchestrator), providers, globals.css
components/     Header, Hero, CostSplitter, ReservationsList,
                ReservationModal, DeleteReservationDialog, Footer, …
components/ui/  shadcn/ui primitives
hooks/          use-reservations (TanStack Query CRUD)
lib/            supabase client, reservations-store (Supabase | demo),
                validations (zod), constants, types, confetti
supabase/       schema.sql
```
