// Standardisation : transforme les données brutes de l'API en données prêtes à l'emploi pour les composants

import type { DailyActivity, User } from "../types";
import type { ApiSession, ApiUserInfo } from "./api-types";

// "2025-01-04" → 4 janvier 2025 à minuit, heure française
const toLocalDate = (text: string) => new Date(`${text}T00:00`);

/** L'API ne renvoie pas encore l'objectif hebdomadaire : valeur de la maquette en attendant */
const DEFAULT_WEEKLY_GOAL = 6;

// Profil : on garde tout, sauf la date d'inscription (texte → date) et la distance totale (texte → nombre)
export const normalizeUser = ({ profile, statistics }: ApiUserInfo): User => ({
  profile: { ...profile, createdAt: toLocalDate(profile.createdAt) },
  statistics: {
    ...statistics,
    totalDistance: Number(statistics.totalDistance),
  },
  weeklyGoal: DEFAULT_WEEKLY_GOAL,
});

// Activité : une entrée par jour, même si le jour compte plusieurs séances (les séances arrivent triées par date)
export const normalizeActivity = (sessions: ApiSession[]): DailyActivity[] => {
  const days: DailyActivity[] = [];

  for (const session of sessions) {
    const lastDay = days.at(-1);
    const date = toLocalDate(session.date);

    // Nouveau jour : on l'ajoute avec cette première séance
    if (!lastDay || lastDay.date.getTime() !== date.getTime()) {
      days.push({ ...session, date, sessions: 1 });
      continue;
    }

    // Même jour que la séance précédente : on ajoute la séance à ce jour
    const duration = lastDay.duration + session.duration;
    lastDay.heartRate = {
      min: Math.min(lastDay.heartRate.min, session.heartRate.min),
      max: Math.max(lastDay.heartRate.max, session.heartRate.max),
      // Moyenne pondérée : une séance longue compte plus qu'une courte
      average:
        (lastDay.heartRate.average * lastDay.duration +
          session.heartRate.average * session.duration) /
        duration,
    };
    lastDay.sessions += 1;
    lastDay.distance += session.distance;
    lastDay.duration = duration;
    lastDay.caloriesBurned += session.caloriesBurned;
  }

  return days;
};
