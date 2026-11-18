import type { DailyActivity } from "~/types";

const DAY_IN_MS = 24 * 60 * 60 * 1000;

/** Totaux : séances, durée (minutes), distance (km) et calories */
export const sumActivity = (days: DailyActivity[]) =>
  days.reduce(
    (total, day) => ({
      sessions: total.sessions + day.sessions,
      duration: total.duration + day.duration,
      distance: total.distance + day.distance,
      caloriesBurned: total.caloriesBurned + day.caloriesBurned,
    }),
    { sessions: 0, duration: 0, distance: 0, caloriesBurned: 0 },
  );

/** Nombre de jours entre deux dates à minuit, bornes comprises (lundi → dimanche = 7) */
const countDays = (start: Date, end: Date) => {
  const gapInDays = (end.getTime() - start.getTime()) / DAY_IN_MS;
  // Math.round : un jour de changement d'heure dure 23 h ou 25 h
  return Math.round(gapInDays) + 1;
};

/** Jours sans séance entre deux dates à minuit, bornes comprises */
export const countRestDays = (days: DailyActivity[], start: Date, end: Date) =>
  countDays(start, end) - days.length;

/** Moyenne par semaine d'un total entre deux dates à minuit (25 jours = 3,57 semaines) */
export const averagePerWeek = (total: number, start: Date, end: Date) => {
  const weeks = countDays(start, end) / 7;
  return total / weeks;
};

/** Fréquence cardiaque moyenne, pondérée par la durée ; null sans séance */
export const averageHeartRate = (days: DailyActivity[]) => {
  const { duration } = sumActivity(days);
  if (duration === 0) return null;

  const weightedTotal = days.reduce(
    (total, day) => total + day.heartRate.average * day.duration,
    0,
  );
  return weightedTotal / duration;
};
