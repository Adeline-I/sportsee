// Point d'entrée des données pour l'application : choisit la source (mock ou API), puis standardise les données

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
