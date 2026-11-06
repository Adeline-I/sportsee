// Hooks des données de l'utilisateur : les composants les utilisent au lieu d'appeler data-service eux-mêmes
// Le token est fourni par useData : les composants n'ont pas à s'en occuper

import { useCallback } from "react";
import {
  getProfile,
  getUserActivity,
  getUserInfo,
} from "~/services/data-service";
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
