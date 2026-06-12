"use client";

import {
  Pencil,
  Trash2,
  Users,
  Mail,
  Phone,
  Ruler,
  CalendarDays,
  TentTree,
  AlertCircle,
  Plus,
} from "lucide-react";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useReservations } from "@/hooks/use-reservations";
import type { Reservation } from "@/lib/types";

function initials(r: Reservation) {
  return `${r.first_name[0] ?? ""}${r.last_name[0] ?? ""}`.toUpperCase();
}

function joinedDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function Avatar({ r }: { r: Reservation }) {
  return (
    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-navy/10 text-xs font-bold text-brand-navy">
      {initials(r)}
    </span>
  );
}

export function ReservationsList({
  onEdit,
  onDelete,
  onReserve,
}: {
  onEdit: (r: Reservation) => void;
  onDelete: (r: Reservation) => void;
  onReserve: () => void;
}) {
  const { data, isLoading, isError, refetch, isFetching } = useReservations();
  const count = data?.length ?? 0;

  return (
    <section id="reservations" className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-3xl tracking-tight text-foreground sm:text-4xl">
            Who&apos;s Coming?
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Everyone who&apos;s claimed a spot so far.
          </p>
        </div>
        <Badge
          variant="secondary"
          className="h-8 gap-1.5 px-3 text-sm font-semibold"
        >
          <Users className="size-3.5" />
          {isLoading ? "—" : count} {count === 1 ? "camper" : "campers"}
        </Badge>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm ring-1 ring-foreground/5">
        {isError ? (
          <ErrorState onRetry={() => refetch()} />
        ) : isLoading ? (
          <LoadingState />
        ) : count === 0 ? (
          <EmptyState onReserve={onReserve} />
        ) : (
          <>
            {/* Desktop / iPad table */}
            <div className="hidden md:block">
              <Table>
                <TableHeader>
                  <TableRow className="bg-secondary/50 hover:bg-secondary/50">
                    <TableHead className="pl-4">Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead className="text-right">Camper (ft)</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead className="pr-4 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data!.map((r) => (
                    <TableRow key={r.id} className="group">
                      <TableCell className="pl-4">
                        <div className="flex items-center gap-3">
                          <Avatar r={r} />
                          <span className="font-medium text-foreground">
                            {r.first_name} {r.last_name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        <a
                          href={`mailto:${r.email}`}
                          className="hover:text-foreground hover:underline"
                        >
                          {r.email}
                        </a>
                      </TableCell>
                      <TableCell className="tabular-nums text-muted-foreground">
                        {r.phone}
                      </TableCell>
                      <TableCell className="text-right">
                        <span className="inline-flex items-center gap-1 font-semibold tabular-nums text-foreground">
                          {r.camper_length}
                          <span className="text-xs font-normal text-muted-foreground">
                            ft
                          </span>
                        </span>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {joinedDate(r.created_at)}
                      </TableCell>
                      <TableCell className="pr-4">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            className="rounded-lg text-muted-foreground hover:text-foreground"
                            onClick={() => onEdit(r)}
                            aria-label={`Edit ${r.first_name} ${r.last_name}`}
                          >
                            <Pencil className="size-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            className="rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                            onClick={() => onDelete(r)}
                            aria-label={`Remove ${r.first_name} ${r.last_name}`}
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile cards */}
            <ul className="divide-y divide-border md:hidden">
              {data!.map((r) => (
                <li key={r.id} className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <Avatar r={r} />
                      <div className="min-w-0">
                        <div className="truncate font-semibold text-foreground">
                          {r.first_name} {r.last_name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Joined {joinedDate(r.created_at)}
                        </div>
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-1">
                      <Button
                        variant="outline"
                        size="icon-sm"
                        className="rounded-lg"
                        onClick={() => onEdit(r)}
                        aria-label={`Edit ${r.first_name}`}
                      >
                        <Pencil className="size-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon-sm"
                        className="rounded-lg text-destructive"
                        onClick={() => onDelete(r)}
                        aria-label={`Remove ${r.first_name}`}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </div>
                  <dl className="mt-3 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
                    <Detail icon={<Mail className="size-3.5" />} value={r.email} href={`mailto:${r.email}`} />
                    <Detail icon={<Phone className="size-3.5" />} value={r.phone} href={`tel:${r.phone}`} />
                    <Detail
                      icon={<Ruler className="size-3.5" />}
                      value={`${r.camper_length} ft camper`}
                    />
                  </dl>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      {isFetching && !isLoading && (
        <p className="mt-3 text-center text-xs text-muted-foreground">
          Syncing latest…
        </p>
      )}
    </section>
  );
}

function Detail({
  icon,
  value,
  href,
}: {
  icon: React.ReactNode;
  value: string;
  href?: string;
}) {
  return (
    <div className="flex items-center gap-2 text-muted-foreground">
      <span className="text-brand-red">{icon}</span>
      {href ? (
        <a href={href} className="truncate hover:text-foreground hover:underline">
          {value}
        </a>
      ) : (
        <span className="truncate">{value}</span>
      )}
    </div>
  );
}

function LoadingState() {
  return (
    <div className="divide-y divide-border">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 p-4">
          <Skeleton className="size-9 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-3 w-56" />
          </div>
          <Skeleton className="hidden h-4 w-16 sm:block" />
          <Skeleton className="size-7 rounded-lg" />
          <Skeleton className="size-7 rounded-lg" />
        </div>
      ))}
    </div>
  );
}

function EmptyState({ onReserve }: { onReserve: () => void }) {
  return (
    <div className="flex flex-col items-center gap-4 px-6 py-16 text-center">
      <span className="grid size-14 place-items-center rounded-2xl bg-brand-red/10 text-brand-red">
        <TentTree className="size-7" />
      </span>
      <div>
        <p className="font-display text-xl tracking-wide text-foreground">
          No takers yet
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          The campsite&apos;s wide open. Be the first to claim a spot.
        </p>
      </div>
      <Button
        onClick={onReserve}
        className="h-11 gap-2 rounded-xl bg-brand-red px-6 font-semibold text-white hover:bg-brand-red/90"
      >
        <Plus className="size-4" />
        Reserve Your Spot
      </Button>
    </div>
  );
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center gap-4 px-6 py-16 text-center">
      <span className="grid size-14 place-items-center rounded-2xl bg-destructive/10 text-destructive">
        <AlertCircle className="size-7" />
      </span>
      <div>
        <p className="font-display text-xl tracking-wide text-foreground">
          Couldn&apos;t load reservations
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Something went sideways talking to the database.
        </p>
      </div>
      <Button variant="outline" className="h-10 rounded-xl" onClick={onRetry}>
        Try again
      </Button>
    </div>
  );
}
