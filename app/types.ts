// Données standardisées, utilisées par les composants

export type User = {
  profile: {
    firstName: string;
    lastName: string;
    createdAt: Date;
    age: number;
    weight: number; // kg
    height: number; // cm
    profilePicture: string; // adresse de l'image
  };
  statistics: {
    totalDistance: number; // km
    totalSessions: number;
    totalDuration: number; // minutes
  };
  /** Nombre de courses visées par semaine */
  weeklyGoal: number;
};

// Activité d'une journée : toutes les séances du jour regroupées
export type DailyActivity = {
  date: Date;
  sessions: number; // nombre de séances ce jour-là
  distance: number; // km
  duration: number; // minutes
  heartRate: {
    min: number;
    max: number;
    average: number; // moyenne pondérée par la durée des séances
  };
  caloriesBurned: number;
};
