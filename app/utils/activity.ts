// Calculs à partir de l'activité (une entrée par jour avec au moins une séance)

import type { DailyActivity } from "~/types";

const DAY_IN_MS = 24 * 60 * 60 * 1000;

// Total des calories brûlées : à chaque jour, on ajoute ses calories au total
export const sumCalories = (days: DailyActivity[]) =>
  days.reduce((total, day) => total + day.caloriesBurned, 0);

// Totaux : nombre de séances, durée (minutes) et distance (km)
export const sumActivity = (days: DailyActivity[]) =>
  days.reduce(
    (total, day) => ({
      sessions: total.sessions + day.sessions,
      duration: total.duration + day.duration,
      distance: total.distance + day.distance,
    }),
    { sessions: 0, duration: 0, distance: 0 },
  );

/** Nombre de jours entre deux dates à minuit, bornes comprises (ex. : lundi → dimanche = 7 jours) */
const countDays = (start: Date, end: Date) => {
  const gapInDays = (end.getTime() - start.getTime()) / DAY_IN_MS;
  return Math.round(gapInDays) + 1;
};

// Jours sans séance entre deux dates à minuit, bornes comprises
export const countRestDays = (days: DailyActivity[], start: Date, end: Date) =>
  countDays(start, end) - days.length;

/** Moyenne par semaine d'un total entre deux dates à minuit (ex. : 25 jours = 3,57 semaines) */
export const averagePerWeek = (total: number, start: Date, end: Date) => {
  const weeks = countDays(start, end) / 7;
  return total / weeks;
};
