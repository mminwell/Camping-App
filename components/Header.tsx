"use client";

import { Tent, Star, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TRIP_TITLE, TRIP_TAGLINE } from "@/lib/constants";

export function Header({ onReserve }: { onReserve: () => void }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/70 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/65">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-3">
          <span className="relative grid size-10 place-items-center rounded-xl bg-brand-navy text-white shadow-sm ring-1 ring-black/5">
            <Tent className="size-5" aria-hidden />
            <Star
              className="absolute -right-1 -top-1 size-4 fill-brand-gold text-brand-gold drop-shadow"
              aria-hidden
            />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-display text-lg tracking-wide text-foreground sm:text-xl">
              {TRIP_TITLE}
            </span>
            <span className="hidden text-xs font-medium text-muted-foreground sm:block">
              {TRIP_TAGLINE}
            </span>
          </span>
        </a>

        <Button
          onClick={onReserve}
          className="h-10 gap-1.5 rounded-xl bg-brand-red px-4 text-sm font-semibold text-white shadow-sm hover:bg-brand-red/90"
        >
          <Sparkles className="size-4" aria-hidden />
          <span className="hidden sm:inline">Reserve Your Spot</span>
          <span className="sm:hidden">Reserve</span>
        </Button>
      </div>
    </header>
  );
}
