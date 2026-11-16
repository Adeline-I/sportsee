import {
  averageHeartRate,
  averagePerWeek,
  sumActivity,
} from "~/utils/activity";
import { getToday, getWeek, getWeekDays, toApiDate } from "~/utils/date";
import { getUserActivity, getUserInfo } from "./data-service";

// Dashboard : le profil et l'activité de la semaine en cours, puis les totaux de la semaine
export const getDashboard = async (token: string) => {
  const { start, end } = getWeek(new Date());

  // Les deux requêtes sont indépendantes : on les lance en même temps
  const [user, days] = await Promise.all([
    getUserInfo(token),
    getUserActivity(token, toApiDate(start), toApiDate(end)),
  ]);

  return { user, week: { start, end, ...sumActivity(days) } };
};

/**
 * Graphique km : distance de chaque semaine et moyenne par semaine.
 * La moyenne ne compte que les jours passés depuis l'inscription.
 */
export const getWeeklyDistances = async (
  token: string,
  weeks: { start: Date; end: Date }[],
  createdAt: Date,
) => {
  const periodStart = weeks[0].start;
  const periodEnd = weeks[weeks.length - 1].end;

  // Une seule requête pour toute la période
  const days = await getUserActivity(
    token,
    toApiDate(periodStart),
    toApiDate(periodEnd),
  );

  // Pour chaque semaine : total des km des jours entre son lundi et son dimanche
  const distances = weeks.map(({ start, end }) => {
    const daysOfWeek = days.filter(
      (day) => day.date >= start && day.date <= end,
    );
    return { start, end, distance: sumActivity(daysOfWeek).distance };
  });

  const today = getToday();

  // Jours réellement possibles : pas avant l'inscription, pas après aujourd'hui
  const from = createdAt > periodStart ? createdAt : periodStart;
  const to = today < periodEnd ? today : periodEnd;

  return {
    weeks: distances,
    average: averagePerWeek(sumActivity(days).distance, from, to),
  };
};

/**
 * Graphique BPM : min, max et moyenne de chaque jour du lundi au dimanche (null si pas de séance).
 * Moyenne de la semaine pondérée par la durée (null si aucune séance).
 */
export const getWeeklyHeartRate = async (
  token: string,
  { start, end }: { start: Date; end: Date },
) => {
  const days = await getUserActivity(token, toApiDate(start), toApiDate(end));

  const heartRates = getWeekDays(start).map((date) => {
    // getTime() : deux Date ne sont jamais égales avec ===, leurs millisecondes si
    const activity = days.find((day) => day.date.getTime() === date.getTime());

    return {
      date,
      min: activity?.heartRate.min ?? null,
      max: activity?.heartRate.max ?? null,
      average: activity?.heartRate.average ?? null,
    };
  });

  return { days: heartRates, average: averageHeartRate(days) };
};
