import {
  RESERVATIONS_TABLE,
  isSupabaseConfigured,
  supabase,
} from "@/lib/supabase";
import type { Reservation, ReservationInput } from "@/lib/types";

/**
 * Single data-access layer for reservations.
 *
 * - When Supabase is configured, all CRUD goes to Postgres (synced across
 *   devices, as required).
 * - Otherwise we fall back to a localStorage-backed demo store so the app is
 *   fully interactive locally before the database exists. The UI surfaces a
 *   "Demo mode" badge in that case so nobody mistakes it for synced data.
 */

export const demoMode = !isSupabaseConfigured;

const DEMO_KEY = "shitshow.reservations.v1";

/* ----------------------------- demo store ----------------------------- */

function uuid(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function demoSeed(): Reservation[] {
  const now = Date.now();
  const mk = (
    i: number,
    first: string,
    last: string,
    email: string,
    phone: string,
    len: number,
  ): Reservation => ({
    id: uuid(),
    first_name: first,
    last_name: last,
    email,
    phone,
    camper_length: len,
    created_at: new Date(now - (3 - i) * 86_400_000).toISOString(),
    updated_at: null,
  });
  return [
    mk(0, "Dale", "Gribble", "dale@example.com", "(512) 555-0142", 24),
    mk(1, "Nancy", "Boggs", "nancy@example.com", "(512) 555-0188", 31),
    mk(2, "Hank", "Rivera", "hank@example.com", "(737) 555-0110", 19),
  ];
}

function demoRead(): Reservation[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(DEMO_KEY);
    if (!raw) {
      const seeded = demoSeed();
      window.localStorage.setItem(DEMO_KEY, JSON.stringify(seeded));
      return seeded;
    }
    return JSON.parse(raw) as Reservation[];
  } catch {
    return [];
  }
}

function demoWrite(rows: Reservation[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(DEMO_KEY, JSON.stringify(rows));
}

// Tiny delay so loading/optimistic states are visible and realistic in demo mode.
const wait = (ms = 350) => new Promise((r) => setTimeout(r, ms));

/* ------------------------------- API --------------------------------- */

export async function fetchReservations(): Promise<Reservation[]> {
  if (demoMode) {
    await wait(400);
    return demoRead().sort(
      (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
    );
  }

  const { data, error } = await supabase!
    .from(RESERVATIONS_TABLE)
    .select("*")
    .order("created_at", { ascending: true });

  if (error) throw new Error(error.message);
  return (data ?? []) as Reservation[];
}

export async function createReservation(
  input: ReservationInput,
): Promise<Reservation> {
  if (demoMode) {
    await wait();
    const rows = demoRead();
    const row: Reservation = {
      ...input,
      id: uuid(),
      created_at: new Date().toISOString(),
      updated_at: null,
    };
    demoWrite([...rows, row]);
    return row;
  }

  const { data, error } = await supabase!
    .from(RESERVATIONS_TABLE)
    .insert(input)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as Reservation;
}

export async function updateReservation(
  id: string,
  input: ReservationInput,
): Promise<Reservation> {
  if (demoMode) {
    await wait();
    const rows = demoRead();
    const next = rows.map((r) =>
      r.id === id ? { ...r, ...input, updated_at: new Date().toISOString() } : r,
    );
    demoWrite(next);
    const found = next.find((r) => r.id === id);
    if (!found) throw new Error("Reservation not found");
    return found;
  }

  const { data, error } = await supabase!
    .from(RESERVATIONS_TABLE)
    .update({ ...input, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as Reservation;
}

export async function deleteReservation(id: string): Promise<void> {
  if (demoMode) {
    await wait();
    demoWrite(demoRead().filter((r) => r.id !== id));
    return;
  }

  const { error } = await supabase!
    .from(RESERVATIONS_TABLE)
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);
}
