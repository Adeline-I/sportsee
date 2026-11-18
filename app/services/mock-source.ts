import loginMock from "../mocks/login.json";
import userActivityMock from "../mocks/user-activity.json";
import userInfoMock from "../mocks/user-info.json";
import type { ApiLoginResponse, ApiSession, ApiUserInfo } from "./api-types";

/** Connexion simulée : tous les identifiants sont acceptés (paramètres en _ : reçus mais pas utilisés) */
export const login = async (
  _username: string,
  _password: string,
): Promise<ApiLoginResponse> => loginMock;

/** Le token n'est pas vérifié */
export const getUserInfo = async (_token: string): Promise<ApiUserInfo> =>
  userInfoMock;

/** Séances entre deux dates "AAAA-MM-JJ", bornes comprises */
export const getUserActivity = async (
  _token: string,
  startDate: string,
  endDate: string,
): Promise<ApiSession[]> =>
  // Les dates "AAAA-MM-JJ" se comparent directement comme du texte
  userActivityMock.filter(
    (session) => session.date >= startDate && session.date <= endDate,
  );
