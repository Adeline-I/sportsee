/** Copie de `date` décalée de `days` jours (négatif = vers le passé) */
export const shiftDate = (date: Date, days: number) => {
  const shiftedDate = new Date(date);
  shiftedDate.setDate(shiftedDate.getDate() + days);
  return shiftedDate;
};

/** Copie de `date` à minuit (début du jour) */
const startOfDay = (date: Date) => {
  const day = new Date(date);
  day.setHours(0, 0, 0, 0);
  return day;
};

/** Semaine d'une date : du lundi au dimanche, à minuit */
export const getWeek = (date: Date) => {
  const day = startOfDay(date);
  // getDay() : dimanche = 0, lundi = 1… ; (jour + 6) % 7 = nombre de jours depuis lundi
  const start = shiftDate(day, -((day.getDay() + 6) % 7));

  return { start, end: shiftDate(start, 6) };
};

/** Liste de `count` semaines (lundi → dimanche) : la dernière contient `date` */
export const getWeeks = (date: Date, count: number) =>
  Array.from({ length: count }, (_, index) => {
    const weeksBack = count - 1 - index;
    return getWeek(shiftDate(date, -weeksBack * 7));
  });

/** Les 7 jours (lundi → dimanche, à minuit) de la semaine qui contient `date` */
export const getWeekDays = (date: Date) => {
  const { start } = getWeek(date);
  return Array.from({ length: 7 }, (_, index) => shiftDate(start, index));
};

/** Aujourd'hui à minuit, pour compter des jours entiers */
export const getToday = () => startOfDay(new Date());

/** Date → "AAAA-MM-JJ" en heure locale, le format attendu par l'API */
export const toApiDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // janvier = 0 devient 01
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
