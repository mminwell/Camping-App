"use client";

import { FlaskConical } from "lucide-react";
import { demoMode } from "@/lib/reservations-store";

export function DemoBanner() {
  if (!demoMode) return null;
  return (
    <div className="border-b border-brand-gold/30 bg-brand-gold/15 text-foreground">
      <div className="mx-auto flex max-w-6xl items-center gap-2 px-4 py-2 text-xs sm:px-6 sm:text-sm">
        <FlaskConical className="size-4 shrink-0 text-brand-red" />
        <p>
          <span className="font-semibold">Demo mode.</span> Reservations are
          saved in this browser only and aren&apos;t synced. Add Supabase
          credentials to go live across all devices.
        </p>
      </div>
    </div>
  );
}
