"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { DemoBanner } from "@/components/DemoBanner";
import { Hero } from "@/components/Hero";
import { ReservationsList } from "@/components/ReservationsList";
import { ReservationModal } from "@/components/ReservationModal";
import { DeleteReservationDialog } from "@/components/DeleteReservationDialog";
import { ReserveFab } from "@/components/ReserveFab";
import { Footer } from "@/components/Footer";
import type { Reservation } from "@/lib/types";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Reservation | null>(null);
  const [deleting, setDeleting] = useState<Reservation | null>(null);

  const openCreate = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (r: Reservation) => {
    setEditing(r);
    setModalOpen(true);
  };

  return (
    <>
      <Header onReserve={openCreate} />
      <DemoBanner />

      <main className="flex-1">
        <Hero onReserve={openCreate} />
        <ReservationsList
          onEdit={openEdit}
          onDelete={(r) => setDeleting(r)}
          onReserve={openCreate}
        />
      </main>

      <Footer />
      <ReserveFab onReserve={openCreate} />

      <ReservationModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        reservation={editing}
      />
      <DeleteReservationDialog
        reservation={deleting}
        onOpenChange={(o) => !o && setDeleting(null)}
      />
    </>
  );
}
