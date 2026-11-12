// Point d'entrée des données pour l'application : choisit la source (mock ou API), puis standardise les données

import {
  averagePerWeek,
  countRestDays,
  sumActivity,
  sumCalories,
} from "~/utils/activity";
import { getWeek } from "~/utils/date";
import * as apiSource from "./api-source";
import * as mockSource from "./mock-source";
import { normalizeActivity, normalizeUser } from "./normalize";

const dataSource = import.meta.env.VITE_DATA_SOURCE;

// Fichier .env absent ou mal rempli
if (dataSource !== "api" && dataSource !== "mock") {
  throw new Error(
    'VITE_DATA_SOURCE doit valoir "api" ou "mock" : vérifiez le fichier .env',
  );
}

const source = dataSource === "mock" ? mockSource : apiSource;

// La réponse de connexion est déjà utilisable : rien à standardiser
export const login = (username: string, password: string) =>
  source.login(username, password);

export const getUserInfo = async (token: string) =>
  normalizeUser(await source.getUserInfo(token));

export const getUserActivity = async (
  token: string,
  startWeek: string,
  endWeek: string,
) => normalizeActivity(await source.getUserActivity(token, startWeek, endWeek));

// Date → "AAAA-MM-JJ" en heure locale
const toApiDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // janvier = 0 devient 01
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// Page profil : le profil, puis l'activité de l'inscription à aujourd'hui, puis les calculs
export const getProfile = async (token: string) => {
  const user = await getUserInfo(token);

  const start = user.profile.createdAt;
  const today = new Date();
  today.setHours(0, 0, 0, 0); // minuit : on compte des jours entiers

  const days = await getUserActivity(token, toApiDate(start), toApiDate(today));

  return {
    user,
    caloriesBurned: sumCalories(days),
    restDays: countRestDays(days, start, today),
  };
};

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

  const today = new Date();
  today.setHours(0, 0, 0, 0); // minuit : on compte des jours entiers

  // Jours réellement possibles : pas avant l'inscription, pas après aujourd'hui
  const from = createdAt > periodStart ? createdAt : periodStart;
  const to = today < periodEnd ? today : periodEnd;

  return {
    weeks: distances,
    average: averagePerWeek(sumActivity(days).distance, from, to),
  };
};
