"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Loader2,
  User,
  Mail,
  Phone,
  Ruler,
  PartyPopper,
  Save,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  reservationSchema,
  type ReservationFormValues,
} from "@/lib/validations";
import {
  useCreateReservation,
  useUpdateReservation,
} from "@/hooks/use-reservations";
import type { Reservation } from "@/lib/types";
import { fireCelebration } from "@/lib/confetti";

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  const len = digits.length;
  if (len < 4) return digits;
  if (len < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

const EMPTY: ReservationFormValues = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  camper_length: undefined as unknown as number,
};

export function ReservationModal({
  open,
  onOpenChange,
  reservation,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reservation: Reservation | null;
}) {
  const isEdit = Boolean(reservation);
  const create = useCreateReservation();
  const update = useUpdateReservation();
  const pending = create.isPending || update.isPending;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationSchema),
    defaultValues: EMPTY,
    mode: "onTouched",
  });

  // Sync form contents whenever the dialog opens or the target row changes.
  useEffect(() => {
    if (!open) return;
    if (reservation) {
      reset({
        first_name: reservation.first_name,
        last_name: reservation.last_name,
        email: reservation.email,
        phone: reservation.phone,
        camper_length: reservation.camper_length,
      });
    } else {
      reset(EMPTY);
    }
  }, [open, reservation, reset]);

  const onSubmit = (values: ReservationFormValues) => {
    if (isEdit && reservation) {
      update.mutate(
        { id: reservation.id, input: values },
        {
          onSuccess: () => {
            toast.success("Reservation updated", {
              description: `${values.first_name}'s details are saved.`,
            });
            onOpenChange(false);
          },
          onError: (err) =>
            toast.error("Couldn't save changes", {
              description: err instanceof Error ? err.message : undefined,
            }),
        },
      );
    } else {
      create.mutate(values, {
        onSuccess: () => {
          onOpenChange(false);
          fireCelebration();
          toast.success(
            "You're in! Welcome to the 4th of July Shit Show 🎉",
            { description: "Your spot is locked in. See you at the lake." },
          );
        },
        onError: (err) =>
          toast.error("Couldn't reserve your spot", {
            description: err instanceof Error ? err.message : undefined,
          }),
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-xl tracking-wide">
            {isEdit ? "Edit reservation" : "Reserve your spot"}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Update the details below and save."
              : "Drop your info and you're on the list. All fields required."}
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="grid gap-4"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field
              id="first_name"
              label="First name"
              icon={<User className="size-3.5" />}
              error={errors.first_name?.message}
            >
              <Input
                id="first_name"
                autoComplete="given-name"
                placeholder="Dale"
                aria-invalid={!!errors.first_name}
                {...register("first_name")}
              />
            </Field>
            <Field
              id="last_name"
              label="Last name"
              error={errors.last_name?.message}
            >
              <Input
                id="last_name"
                autoComplete="family-name"
                placeholder="Gribble"
                aria-invalid={!!errors.last_name}
                {...register("last_name")}
              />
            </Field>
          </div>

          <Field
            id="email"
            label="Email"
            icon={<Mail className="size-3.5" />}
            error={errors.email?.message}
          >
            <Input
              id="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="dale@example.com"
              aria-invalid={!!errors.email}
              {...register("email")}
            />
          </Field>

          <Field
            id="phone"
            label="Cell"
            icon={<Phone className="size-3.5" />}
            error={errors.phone?.message}
          >
            <Controller
              control={control}
              name="phone"
              render={({ field }) => (
                <Input
                  id="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="(512) 555-0142"
                  aria-invalid={!!errors.phone}
                  value={field.value ?? ""}
                  onChange={(e) => field.onChange(formatPhone(e.target.value))}
                  onBlur={field.onBlur}
                />
              )}
            />
          </Field>

          <Field
            id="camper_length"
            label="Camper length"
            icon={<Ruler className="size-3.5" />}
            error={errors.camper_length?.message}
            hint="feet"
          >
            <div className="relative">
              <Input
                id="camper_length"
                type="number"
                inputMode="numeric"
                min={1}
                max={80}
                placeholder="25"
                aria-invalid={!!errors.camper_length}
                className="pr-10"
                {...register("camper_length", { valueAsNumber: true })}
              />
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-muted-foreground">
                ft
              </span>
            </div>
          </Field>

          <DialogFooter className="mt-1">
            <Button
              type="button"
              variant="outline"
              className="h-10 rounded-xl"
              onClick={() => onOpenChange(false)}
              disabled={pending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={pending}
              className="h-10 gap-2 rounded-xl bg-brand-red px-5 font-semibold text-white hover:bg-brand-red/90"
            >
              {pending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : isEdit ? (
                <Save className="size-4" />
              ) : (
                <PartyPopper className="size-4" />
              )}
              {pending
                ? "Saving…"
                : isEdit
                  ? "Save changes"
                  : "Lock it in"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function Field({
  id,
  label,
  icon,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  icon?: React.ReactNode;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-1.5">
      <div className="flex items-center justify-between">
        <Label htmlFor={id} className="gap-1.5 text-foreground">
          {icon && <span className="text-muted-foreground">{icon}</span>}
          {label}
        </Label>
        {hint && (
          <span className="text-xs text-muted-foreground">{hint}</span>
        )}
      </div>
      {children}
      <p
        className={cn(
          "min-h-4 text-xs font-medium text-destructive transition-opacity",
          error ? "opacity-100" : "opacity-0",
        )}
        role={error ? "alert" : undefined}
      >
        {error ?? "placeholder"}
      </p>
    </div>
  );
}
