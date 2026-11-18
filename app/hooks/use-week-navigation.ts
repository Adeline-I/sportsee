import { useMemo, useState } from "react";
import { getWeeks, shiftDate } from "~/utils/date";

/**
 * Navigation par pas d'une semaine entre des périodes de `count` semaines, de l'inscription à la semaine en cours.
 * Au départ, la dernière semaine affichée est la semaine en cours.
 */
export const useWeekNavigation = (createdAt: Date, count: number) => {
  // Décalage en semaines : 0 = période actuelle, -1 = une semaine plus tôt…
  const [offset, setOffset] = useState(0);

  // useMemo : mêmes semaines tant que le décalage ne change pas, sinon le chargement serait relancé à chaque affichage
  const weeks = useMemo(
    () => getWeeks(shiftDate(new Date(), offset * 7), count),
    [offset, count],
  );

  // Limites : pas avant la semaine d'inscription, pas après la semaine en cours
  const hasPrevious = weeks[0].start > createdAt;
  const hasNext = offset < 0;

  const showPrevious = () => {
    if (hasPrevious) setOffset((current) => current - 1);
  };
  const showNext = () => {
    if (hasNext) setOffset((current) => current + 1);
  };

  return { weeks, hasPrevious, hasNext, showPrevious, showNext };
};
