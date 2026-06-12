// Fixed, agreed-upon total cost for the whole trip (USD).
export const TOTAL_GROUP_COST = 1428.0;

// Trip window.
export const CHECK_IN = "Thursday, July 2 · 3:00 PM";
export const CHECK_OUT = "Monday, July 6 · 12:00 PM";

export const TRIP_TITLE = "4th of July Shit Show";
export const TRIP_TAGLINE = "Celebrate our 250th anniversary!";

/** Cost per camper given a head count. Never divides by zero. */
export function costPerCamper(count: number): number {
  if (!count || count < 1) return TOTAL_GROUP_COST;
  return TOTAL_GROUP_COST / count;
}

export const usd = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD" });
