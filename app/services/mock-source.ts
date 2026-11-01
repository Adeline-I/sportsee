// Source « mock » : mêmes fonctions que la source API,mais les données viennent des fichiers JSON de app/mocks/

import loginMock from "../mocks/login.json";
import userActivityMock from "../mocks/user-activity.json";
import userInfoMock from "../mocks/user-info.json";
import type { ApiLoginResponse, ApiSession, ApiUserInfo } from "./api-types";

// Les paramètres qui commencent par _ sont reçus mais pas utilisés :
// le mock accepte n'importe quels identifiants et ne vérifie pas le token
export const login = async (
  _username: string,
  _password: string,
): Promise<ApiLoginResponse> => loginMock;

export const getUserInfo = async (_token: string): Promise<ApiUserInfo> =>
  userInfoMock;

// Garde les séances entre les deux dates, comme le backend
// (les dates "AAAA-MM-JJ" se comparent directement comme du texte)
export const getUserActivity = async (
  _token: string,
  startWeek: string,
  endWeek: string,
): Promise<ApiSession[]> =>
  userActivityMock.filter(
    (session) => session.date >= startWeek && session.date <= endWeek,
  );
