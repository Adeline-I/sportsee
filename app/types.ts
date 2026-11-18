/** Utilisateur standardisé : profil, statistiques et objectif */
export type User = {
  profile: {
    firstName: string;
    lastName: string;
    createdAt: Date;
    age: number;
    /** kg */
    weight: number;
    /** cm */
    height: number;
    /** Adresse de l'image */
    profilePicture: string;
  };
  statistics: {
    /** km */
    totalDistance: number;
    totalSessions: number;
    /** minutes */
    totalDuration: number;
  };
  /** Nombre de courses visées par semaine */
  weeklyGoal: number;
};

/** Activité d'une journée : toutes les séances du jour regroupées */
export type DailyActivity = {
  date: Date;
  /** Nombre de séances ce jour-là */
  sessions: number;
  /** km */
  distance: number;
  /** minutes */
  duration: number;
  heartRate: {
    min: number;
    max: number;
    /** Moyenne pondérée par la durée des séances */
    average: number;
  };
  caloriesBurned: number;
};

/** Semaine du lundi au dimanche, à minuit */
export type Week = {
  start: Date;
  end: Date;
};
