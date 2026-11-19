import { getProfile } from "~/services/profile-service";
import { useProtectedData } from "./use-protected-data";

/** Page profil : profil, statistiques, calories et jours de repos */
export const useProfile = () => useProtectedData(getProfile);
