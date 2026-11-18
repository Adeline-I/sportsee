import { getDashboard } from "~/services/dashboard-service";
import { useProtectedData } from "./use-protected-data";

/** Page dashboard : profil, statistiques et totaux de la semaine en cours */
export const useDashboard = () => useProtectedData(getDashboard);
