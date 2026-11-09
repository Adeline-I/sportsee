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

// Jours sans séance entre deux dates à minuit, bornes comprises
export const countRestDays = (
  days: DailyActivity[],
  start: Date,
  end: Date,
) => {
  // Arrondi : au changement d'heure, un jour dure 23 h ou 25 h
  const totalDays =
    Math.round((end.getTime() - start.getTime()) / DAY_IN_MS) + 1;
  return totalDays - days.length;
};
