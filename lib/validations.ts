import { z } from "zod";

// US-friendly phone: allow digits, spaces, dashes, parens, leading +.
const phoneRegex = /^[+]?[(]?\d{3}[)]?[\s.-]?\d{3}[\s.-]?\d{4}$/;

export const reservationSchema = z.object({
  first_name: z
    .string()
    .trim()
    .min(1, "First name is required")
    .max(50, "That's a long name — keep it under 50 characters"),
  last_name: z
    .string()
    .trim()
    .min(1, "Last name is required")
    .max(50, "Keep it under 50 characters"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  phone: z
    .string()
    .trim()
    .min(1, "Cell number is required")
    .regex(phoneRegex, "Enter a valid 10-digit US phone number"),
  camper_length: z
    .number({ error: "Enter your camper length (1–80 ft)" })
    .int("Use a whole number of feet")
    .min(1, "Enter your camper length (1–80 ft)")
    .max(80, "80 ft is the max — that's a serious rig"),
});

export type ReservationFormValues = z.infer<typeof reservationSchema>;
