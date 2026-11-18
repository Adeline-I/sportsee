import type { ApiLoginResponse, ApiSession, ApiUserInfo } from "./api-types";
import { request } from "./http";

/** Connexion au backend : renvoie le token */
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

export const getUserInfo = (token: string): Promise<ApiUserInfo> =>
  request("/api/user-info", token);

/** Séances entre deux dates "AAAA-MM-JJ", bornes comprises */
export const getUserActivity = (
  token: string,
  startDate: string,
  endDate: string,
): Promise<ApiSession[]> =>
  request(
    `/api/user-activity?startWeek=${startDate}&endWeek=${endDate}`,
    token,
  );
