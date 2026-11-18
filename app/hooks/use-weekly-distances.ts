import { useCallback } from "react";
import { getWeeklyDistances } from "~/services/dashboard-service";
import { useProtectedData } from "./use-protected-data";
import { useWeekNavigation } from "./use-week-navigation";

/** Nombre de semaines affichées par le graphique km */
const WEEKS_COUNT = 4;

/** Graphique km : distances et moyenne des 4 semaines affichées, avec la navigation entre les périodes */
export const useWeeklyDistances = (createdAt: Date) => {
  const navigation = useWeekNavigation(createdAt, WEEKS_COUNT);
  const { weeks } = navigation;

  const load = useCallback(
    (token: string) => getWeeklyDistances(token, weeks, createdAt),
    [weeks, createdAt],
  );
  const result = useProtectedData(load);

  return { ...result, ...navigation };
};
