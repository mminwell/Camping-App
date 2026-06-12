"use client";

import { ArrowRight, CalendarCheck, CalendarX2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CostSplitter } from "@/components/CostSplitter";
import { CHECK_IN, CHECK_OUT, TRIP_TAGLINE } from "@/lib/constants";

export function Hero({ onReserve }: { onReserve: () => void }) {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-60" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-2 bg-gradient-to-r from-brand-red via-white to-brand-navy" />
      <div className="pointer-events-none absolute -left-24 top-10 -z-10 size-72 rounded-full bg-brand-red/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 -z-10 size-72 rounded-full bg-brand-navy/10 blur-3xl" />

      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
        <div className="flex flex-col items-start">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-red/20 bg-brand-red/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-red">
            <Sparkles className="size-3.5" aria-hidden />
            July 2–6, 2026 · America&apos;s 250th
          </span>

          <h1 className="mt-5 font-display text-5xl leading-[0.95] tracking-tight text-foreground text-balance sm:text-6xl lg:text-7xl">
            The 4th of July{" "}
            <span className="bg-gradient-to-br from-brand-red to-brand-navy bg-clip-text text-transparent">
              Shit Show
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-lg text-muted-foreground text-balance">
            {TRIP_TAGLINE} Round up your rig, claim your spot, and let&apos;s
            split the bill the easy way. Big lake energy, small per-person price.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              onClick={onReserve}
              className="group h-14 gap-2 rounded-2xl bg-brand-red px-8 text-base font-semibold text-white shadow-lg shadow-brand-red/25 transition-all hover:bg-brand-red/90 hover:shadow-xl hover:shadow-brand-red/30"
            >
              Reserve Your Spot Now
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-0.5" />
            </Button>
            <span className="text-sm text-muted-foreground">
              No login. Takes 20 seconds.
            </span>
          </div>

          {/* Check-in / check-out */}
          <div className="mt-9 grid w-full max-w-md grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex items-start gap-3 rounded-2xl border border-border bg-card/80 p-4 shadow-sm">
              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand-navy/10 text-brand-navy">
                <CalendarCheck className="size-5" aria-hidden />
              </span>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Check-in
                </div>
                <div className="text-sm font-semibold text-foreground">
                  {CHECK_IN}
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-2xl border border-border bg-card/80 p-4 shadow-sm">
              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand-red/10 text-brand-red">
                <CalendarX2 className="size-5" aria-hidden />
              </span>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Check-out
                </div>
                <div className="text-sm font-semibold text-foreground">
                  {CHECK_OUT}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cost splitter — prominent, top-right on desktop */}
        <div className="lg:pl-4">
          <CostSplitter />
        </div>
      </div>
    </section>
  );
}
