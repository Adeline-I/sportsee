import * as apiSource from "./api-source";
import * as mockSource from "./mock-source";
import { normalizeActivity, normalizeUser } from "./normalize";

/** Source des données choisie dans le .env : "api" ou "mock" */
const DATA_SOURCE = import.meta.env.VITE_DATA_SOURCE;

if (DATA_SOURCE !== "api" && DATA_SOURCE !== "mock") {
  throw new Error(
    'VITE_DATA_SOURCE doit valoir "api" ou "mock" : vérifiez le fichier .env',
  );
}

/** Les deux sources ont les mêmes fonctions : le reste de l'application ne voit pas la différence */
const source = DATA_SOURCE === "mock" ? mockSource : apiSource;

/** Connexion : la réponse est déjà utilisable, rien à standardiser */
export const login = source.login;

/** Profil et statistiques, standardisés */
export const getUserInfo = async (token: string) =>
  normalizeUser(await source.getUserInfo(token));

/** Activité entre deux dates "AAAA-MM-JJ", standardisée : une entrée par jour */
export const getUserActivity = async (
  token: string,
  startDate: string,
  endDate: string,
) => normalizeActivity(await source.getUserActivity(token, startDate, endDate));
