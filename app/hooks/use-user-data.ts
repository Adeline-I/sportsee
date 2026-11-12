// Hooks des données de l'utilisateur : les composants les utilisent au lieu d'appeler data-service eux-mêmes
// Le token est fourni par useData : les composants n'ont pas à s'en occuper

import { useCallback } from "react";
import {
  getDashboard,
  getProfile,
  getUserActivity,
  getUserInfo,
  getWeeklyDistances,
} from "~/services/data-service";
import { getWeeks } from "~/utils/date";
import { useData } from "./use-data";

// Profil et statistiques
export const useUserInfo = () => useData(getUserInfo);

// Activité entre deux dates ("AAAA-MM-JJ")
export const useUserActivity = (startWeek: string, endWeek: string) => {
  const load = useCallback(
    (token: string) => getUserActivity(token, startWeek, endWeek),
    [startWeek, endWeek],
  );
  return useData(load);
};

// Page profil : profil, statistiques, calories et jours de repos
export const useProfile = () => useData(getProfile);

// Dashboard : profil, statistiques et totaux de la semaine en cours
export const useDashboard = () => useData(getDashboard);

/** Nombre de semaines affichées par le graphique km */
const WEEKS_COUNT = 4;

/**
 * Graphique km : distances et moyenne de 4 semaines.
 * `offset` décale la période en semaines : 0 = jusqu'à la semaine en cours, -1 = une semaine plus tôt
 */
export const useWeeklyDistances = (offset: number, createdAt: Date) => {
  const load = useCallback(
    (token: string) => {
      const lastDay = new Date();
      lastDay.setDate(lastDay.getDate() + offset * 7);
      return getWeeklyDistances(
        token,
        getWeeks(lastDay, WEEKS_COUNT),
        createdAt,
      );
    },
    [offset, createdAt],
  );
  return useData(load);
};
