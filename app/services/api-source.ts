// Source « API » : récupère les données brutes depuis le backend

import type { ApiLoginResponse, ApiSession, ApiUserInfo } from "./api-types";
import { request } from "./http";

// Connexion : renvoie le token et l'identifiant de l'utilisateur
export const login = async (
  username: string,
  password: string,
): Promise<ApiLoginResponse> => {
  try {
    return await request("/api/login", undefined, { username, password });
  } catch (error) {
    // Pour la connexion, un 401 veut dire « mauvais identifiants »
    if (error instanceof Error && error.cause === 401) {
      throw new Error("Identifiant ou mot de passe incorrect", {
        cause: error,
      });
    }
    throw error;
  }
};

// Profil et statistiques de l'utilisateur connecté
export const getUserInfo = (token: string): Promise<ApiUserInfo> =>
  request("/api/user-info", token);

// Séances entre deux dates ("AAAA-MM-JJ"), bornes comprises
export const getUserActivity = (
  token: string,
  startWeek: string,
  endWeek: string,
): Promise<ApiSession[]> =>
  request(
    `/api/user-activity?startWeek=${startWeek}&endWeek=${endWeek}`,
    token,
  );
