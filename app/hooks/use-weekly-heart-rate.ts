import { useCallback } from "react";
import { getWeeklyHeartRate } from "~/services/dashboard-service";
import { useProtectedData } from "./use-protected-data";
import { useWeekNavigation } from "./use-week-navigation";

/** Nombre de semaines affichées par le graphique BPM */
const WEEKS_COUNT = 1;

/** Graphique BPM : fréquence cardiaque de la semaine affichée, avec la navigation d'une semaine à l'autre */
export const useWeeklyHeartRate = (createdAt: Date) => {
  const { weeks, ...navigation } = useWeekNavigation(createdAt, WEEKS_COUNT);
  const [week] = weeks;

  const load = useCallback(
    (token: string) => getWeeklyHeartRate(token, week),
    [week],
  );
  const result = useProtectedData(load);

  return { ...result, ...navigation, week };
};
