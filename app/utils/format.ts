const dateFormat = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

/** Date → "14 juin 2023" (Intl écrit "1 janvier" : on corrige en "1er janvier") */
export const formatDate = (date: Date) =>
  dateFormat.format(date).replace(/^1 /, "1er ");

const shortDateFormat = new Intl.DateTimeFormat("fr-FR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

/** Date → "02/11/2026" */
export const formatShortDate = (date: Date) => shortDateFormat.format(date);

const periodFormat = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "short",
});

const periodWithYearFormat = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

/**
 * Période → "19 oct. – 15 nov."
 * L'année n'est ajoutée que si la période n'est pas entièrement dans l'année en cours.
 */
export const formatPeriod = (start: Date, end: Date) => {
  const currentYear = new Date().getFullYear();
  const isCurrentYear =
    start.getFullYear() === currentYear && end.getFullYear() === currentYear;
  const format = isCurrentYear ? periodFormat : periodWithYearFormat;
  return format.formatRange(start, end);
};

const numberFormat = new Intl.NumberFormat("fr-FR");

/** 2250.2 → "2 250,2" */
export const formatNumber = (value: number) => numberFormat.format(value);

/** 165 (cm) → "1m65" */
export const formatHeight = (centimeters: number) => {
  const meters = Math.floor(centimeters / 100);
  const rest = String(centimeters % 100).padStart(2, "0"); // 5 → "05"
  return `${meters}m${rest}`;
};

/** 1635 (minutes) → { hours: 27, minutes: 15 } */
export const splitDuration = (totalMinutes: number) => ({
  hours: Math.floor(totalMinutes / 60),
  minutes: totalMinutes % 60,
});

const pluralRules = new Intl.PluralRules("fr-FR");

/** (1, "jour", "jours") → "jour" ; (0, …) → "jour" ; (2, …) → "jours" */
export const pluralize = (count: number, singular: string, plural: string) =>
  pluralRules.select(count) === "one" ? singular : plural;
