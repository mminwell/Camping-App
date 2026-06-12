"use client";

import { Loader2, Trash2, TriangleAlert } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogMedia,
} from "@/components/ui/alert-dialog";
import { useDeleteReservation } from "@/hooks/use-reservations";
import type { Reservation } from "@/lib/types";

export function DeleteReservationDialog({
  reservation,
  onOpenChange,
}: {
  reservation: Reservation | null;
  onOpenChange: (open: boolean) => void;
}) {
  const del = useDeleteReservation();
  const name = reservation
    ? `${reservation.first_name} ${reservation.last_name}`.trim()
    : "";

  const handleDelete = () => {
    if (!reservation) return;
    del.mutate(reservation.id, {
      onSuccess: () => {
        toast.success("Reservation removed", {
          description: `${name} is off the list.`,
        });
        onOpenChange(false);
      },
      onError: (err) =>
        toast.error("Couldn't remove reservation", {
          description: err instanceof Error ? err.message : undefined,
        }),
    });
  };

  return (
    <AlertDialog
      open={Boolean(reservation)}
      onOpenChange={(o) => !o && onOpenChange(false)}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive">
            <TriangleAlert />
          </AlertDialogMedia>
          <AlertDialogTitle>Remove {name || "this camper"}?</AlertDialogTitle>
          <AlertDialogDescription>
            This removes{" "}
            <span className="font-semibold text-foreground">
              {name || "this camper"}
            </span>{" "}
            from the trip and bumps everyone else&apos;s share. This can&apos;t be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="h-10 rounded-xl" disabled={del.isPending}>
            Keep them
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={del.isPending}
            className="h-10 gap-2 rounded-xl bg-destructive text-white hover:bg-destructive/90"
          >
            {del.isPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Trash2 className="size-4" />
            )}
            {del.isPending ? "Removing…" : "Remove"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
