"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createReservation,
  deleteReservation,
  fetchReservations,
  updateReservation,
} from "@/lib/reservations-store";
import type { Reservation, ReservationInput } from "@/lib/types";

export const reservationsKey = ["reservations"] as const;

export function useReservations() {
  return useQuery({
    queryKey: reservationsKey,
    queryFn: fetchReservations,
  });
}

export function useCreateReservation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: ReservationInput) => createReservation(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: reservationsKey }),
  });
}

export function useUpdateReservation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: ReservationInput }) =>
      updateReservation(id, input),
    onSuccess: () => qc.invalidateQueries({ queryKey: reservationsKey }),
  });
}

export function useDeleteReservation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteReservation(id),
    // Optimistic remove so the row disappears instantly.
    onMutate: async (id: string) => {
      await qc.cancelQueries({ queryKey: reservationsKey });
      const previous = qc.getQueryData<Reservation[]>(reservationsKey);
      qc.setQueryData<Reservation[]>(reservationsKey, (old) =>
        (old ?? []).filter((r) => r.id !== id),
      );
      return { previous };
    },
    onError: (_err, _id, ctx) => {
      if (ctx?.previous) qc.setQueryData(reservationsKey, ctx.previous);
    },
    onSettled: () => qc.invalidateQueries({ queryKey: reservationsKey }),
  });
}
