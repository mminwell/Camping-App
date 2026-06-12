import confetti from "canvas-confetti";

const RED = "#d12d3a";
const WHITE = "#ffffff";
const BLUE = "#1d3a6b";
const GOLD = "#e7b53c";

/** A celebratory red-white-blue burst for successful reservations. */
export function fireCelebration() {
  if (typeof window === "undefined") return;

  const colors = [RED, WHITE, BLUE, GOLD];
  const defaults = { origin: { y: 0.7 }, colors, disableForReducedMotion: true };

  confetti({ ...defaults, particleCount: 70, spread: 70, startVelocity: 45 });
  confetti({ ...defaults, particleCount: 40, spread: 110, scalar: 0.9, decay: 0.92 });

  // Two side cannons for a "fireworks" feel.
  const fire = (angle: number, origin: { x: number; y: number }) =>
    confetti({ ...defaults, particleCount: 30, angle, spread: 60, origin });

  window.setTimeout(() => fire(60, { x: 0, y: 0.8 }), 150);
  window.setTimeout(() => fire(120, { x: 1, y: 0.8 }), 150);
}
