export interface Reservation {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  camper_length: number;
  created_at: string;
  updated_at: string | null;
}

/** Shape submitted from the reservation form (before it hits the DB). */
export interface ReservationInput {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  camper_length: number;
}
