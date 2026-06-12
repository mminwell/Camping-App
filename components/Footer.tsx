"use client";

import { Tent, Heart } from "lucide-react";
import { TRIP_TITLE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-secondary/40">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-10 text-center sm:px-6">
        <span className="grid size-10 place-items-center rounded-xl bg-brand-navy text-white">
          <Tent className="size-5" aria-hidden />
        </span>
        <p className="font-display text-lg tracking-wide text-foreground">
          Bring the bug spray. Leave the drama.
        </p>
        <p className="max-w-md text-sm text-muted-foreground text-balance">
          {TRIP_TITLE} · July 2–6, 2026. Pack your rig, square up your share,
          and let&apos;s make the 250th one for the books.
        </p>
        <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
          Made with <Heart className="size-3.5 fill-brand-red text-brand-red" />{" "}
          for the crew · 🇺🇸
        </p>
      </div>
    </footer>
  );
}
