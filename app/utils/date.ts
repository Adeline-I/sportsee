// Calculs de calendrier, en heure locale

// Semaine d'une date : du lundi au dimanche, à minuit
export const getWeek = (date: Date) => {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  // getDay() : dimanche = 0, lundi = 1… ; (jour + 6) % 7 = nombre de jours depuis lundi
  start.setDate(start.getDate() - ((start.getDay() + 6) % 7));

  const end = new Date(start);
  end.setDate(start.getDate() + 6);

  return { start, end };
};

/** Liste de `count` semaines (lundi → dimanche) : la dernière contient `date` */
export const getWeeks = (date: Date, count: number) =>
  Array.from({ length: count }, (_, index) => {
    const weeksBack = count - 1 - index;
    const day = new Date(date);
    day.setDate(date.getDate() - weeksBack * 7);
    return getWeek(day);
  });

/** Aujourd'hui à minuit, pour compter des jours entiers */
export const getToday = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};
