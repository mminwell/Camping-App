"use client";

import { Users, TrendingDown } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useReservations } from "@/hooks/use-reservations";
import { TOTAL_GROUP_COST, costPerCamper, usd } from "@/lib/constants";

export function CostSplitter() {
  const { data, isLoading } = useReservations();
  const count = data?.length ?? 0;
  const perCamper = costPerCamper(count);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-xl shadow-brand-navy/5 ring-1 ring-foreground/5 sm:p-7">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-brand-red via-brand-gold to-brand-navy" />
      <div className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-brand-gold/10 blur-2xl" />

      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          The Damage, Split
        </h2>
        <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
          Fixed total
        </span>
      </div>

      {/* Total */}
      <div className="mt-4">
        <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Total group cost
        </div>
        <div className="font-display text-4xl tracking-tight text-foreground sm:text-5xl">
          {usd(TOTAL_GROUP_COST)}
        </div>
      </div>

      {/* Per camper — the hero number */}
      <div className="mt-5 rounded-2xl bg-gradient-to-br from-brand-navy to-[oklch(0.26_0.09_257)] p-5 text-white shadow-inner">
        <div className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-white/70">
          <TrendingDown className="size-3.5" aria-hidden />
          Cost per camper
        </div>
        {isLoading ? (
          <Skeleton className="mt-1 h-12 w-40 bg-white/20" />
        ) : (
          <div className="font-display text-5xl leading-none tracking-tight sm:text-6xl">
            {usd(perCamper)}
          </div>
        )}
        <div className="mt-2 text-sm text-white/75">
          The more the merrier — the cheaper per rig!
        </div>
      </div>

      {/* Count */}
      <div className="mt-4 flex items-center justify-between rounded-xl border border-border bg-secondary/40 px-4 py-3">
        <span className="flex items-center gap-2 text-sm font-medium text-foreground">
          <Users className="size-4 text-brand-red" aria-hidden />
          Current campers
        </span>
        {isLoading ? (
          <Skeleton className="h-6 w-8" />
        ) : (
          <span className="font-display text-2xl tabular-nums text-foreground">
            {count}
          </span>
        )}
      </div>

      <p className="mt-3 text-center text-xs text-muted-foreground">
        Split evenly across everyone who&apos;s in. Updates the second someone
        joins.
      </p>
    </div>
  );
}
