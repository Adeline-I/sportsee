import { countRestDays, sumCalories } from "~/utils/activity";
import { getToday, toApiDate } from "~/utils/date";
import { getUserActivity, getUserInfo } from "./data-service";

// Page profil : le profil, puis l'activité de l'inscription à aujourd'hui, puis les calculs
export const getProfile = async (token: string) => {
  const user = await getUserInfo(token);

  const start = user.profile.createdAt;
  const today = getToday();

  const days = await getUserActivity(token, toApiDate(start), toApiDate(today));

  return {
    user,
    caloriesBurned: sumCalories(days),
    restDays: countRestDays(days, start, today),
  };
};
