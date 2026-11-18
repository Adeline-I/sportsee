import { countRestDays, sumActivity } from "~/utils/activity";
import { getToday, toApiDate } from "~/utils/date";
import { getUserActivity, getUserInfo } from "./data-service";

/** Page profil : profil, calories et jours de repos depuis l'inscription */
export const getProfile = async (token: string) => {
  // Le profil d'abord : sa date d'inscription sert à demander l'activité
  const user = await getUserInfo(token);

  const start = user.profile.createdAt;
  const today = getToday();

  const days = await getUserActivity(token, toApiDate(start), toApiDate(today));

  return {
    user,
    caloriesBurned: sumActivity(days).caloriesBurned,
    restDays: countRestDays(days, start, today),
  };
};
