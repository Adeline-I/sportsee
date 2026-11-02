// Point d'entrée des données pour l'application : choisit la source (mock ou API), puis standardise les données

import * as apiSource from "./api-source";
import * as mockSource from "./mock-source";
import { normalizeActivity, normalizeUser } from "./normalize";

// "mock" dans .env → fichiers JSON, sinon → vrai backend
const source =
  import.meta.env.VITE_DATA_SOURCE === "mock" ? mockSource : apiSource;

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
