import { useCallback, useMemo, useState } from "react";
import { getWeeklyHeartRate } from "~/services/dashboard-service";
import { getWeek, shiftDate } from "~/utils/date";
import { useData } from "./use-data";

/**
 * Graphique BPM : fréquence cardiaque d'une semaine, avec la navigation d'une semaine à l'autre.
 * Au départ, la semaine en cours.
 */
export const useWeeklyHeartRate = (createdAt: Date) => {
  // Décalage en semaines : 0 = semaine en cours, -1 = semaine précédente
  const [offset, setOffset] = useState(0);

  const week = useMemo(
    () => getWeek(shiftDate(new Date(), offset * 7)),
    [offset],
  );

  const load = useCallback(
    (token: string) => getWeeklyHeartRate(token, week),
    [week],
  );
  const result = useData(load);

  // Limites : pas avant la semaine d'inscription, pas après la semaine en cours
  const hasPrevious = week.start > createdAt;
  const hasNext = offset < 0;

  const showPrevious = () => {
    if (hasPrevious) setOffset((current) => current - 1);
  };
  const showNext = () => {
    if (hasNext) setOffset((current) => current + 1);
  };

  return { ...result, week, hasPrevious, hasNext, showPrevious, showNext };
};
