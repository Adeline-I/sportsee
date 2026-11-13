import { useCallback, useMemo, useState } from "react";
import { getWeeklyDistances } from "~/services/data-service";
import { getWeeks } from "~/utils/date";
import { useData } from "./use-data";

/** Nombre de semaines affichées par le graphique km */
const WEEKS_COUNT = 4;

/**
 * Graphique km : distances et moyenne de 4 semaines, avec la navigation entre les périodes.
 * Au départ, la dernière semaine est la semaine en cours ; chaque pas décale d'une semaine.
 */
export const useWeeklyDistances = (createdAt: Date) => {
  // Décalage en semaines : 0 = période actuelle, -1 = une semaine plus tôt…
  const [offset, setOffset] = useState(0);

  const weeks = useMemo(() => {
    const lastDay = new Date();
    lastDay.setDate(lastDay.getDate() + offset * 7);
    return getWeeks(lastDay, WEEKS_COUNT);
  }, [offset]);

  const load = useCallback(
    (token: string) => getWeeklyDistances(token, weeks, createdAt),
    [weeks, createdAt],
  );
  const result = useData(load);

  // Limites : pas avant la semaine d'inscription, pas après la semaine en cours
  const hasPrevious = weeks[0].start > createdAt;
  const hasNext = offset < 0;

  const showPrevious = () => {
    if (hasPrevious) setOffset((current) => current - 1);
  };
  const showNext = () => {
    if (hasNext) setOffset((current) => current + 1);
  };

  return { ...result, weeks, hasPrevious, hasNext, showPrevious, showNext };
};
