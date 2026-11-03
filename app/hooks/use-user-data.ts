// Hooks des données de l'utilisateur : les composants les utilisent au lieu d'appeler data-service eux-mêmes

import { useCallback } from "react";
import { getUserActivity, getUserInfo } from "~/services/data-service";
import { useData } from "./use-data";

// Profil et statistiques
export const useUserInfo = (token: string) => {
  // Même fonction tant que le token ne change pas
  const load = useCallback(() => getUserInfo(token), [token]);
  return useData(load);
};

// Activité entre deux dates ("AAAA-MM-JJ")
export const useUserActivity = (
  token: string,
  startWeek: string,
  endWeek: string,
) => {
  // Nouvelle fonction seulement si le token ou les dates changent
  const load = useCallback(
    () => getUserActivity(token, startWeek, endWeek),
    [token, startWeek, endWeek],
  );
  return useData(load);
};
