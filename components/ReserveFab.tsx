"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

/** Mobile-only floating action button to reserve a spot. */
export function ReserveFab({ onReserve }: { onReserve: () => void }) {
  return (
    <Button
      onClick={onReserve}
      aria-label="Reserve your spot"
      className="fixed bottom-5 right-5 z-30 h-14 gap-2 rounded-full bg-brand-red px-5 text-base font-semibold text-white shadow-xl shadow-brand-red/30 hover:bg-brand-red/90 md:hidden"
    >
      <Plus className="size-5" />
      Reserve
    </Button>
  );
}
