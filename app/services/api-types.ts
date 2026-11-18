export type ApiLoginResponse = {
  token: string;
  userId: string;
};

export type ApiUserInfo = {
  profile: {
    firstName: string;
    lastName: string;
    /** "AAAA-MM-JJ" */
    createdAt: string;
    age: number;
    /** kg */
    weight: number;
    /** cm */
    height: number;
    /** Adresse de l'image */
    profilePicture: string;
  };
  statistics: {
    /** km, en texte : "2250.2" */
    totalDistance: string;
    totalSessions: number;
    /** minutes */
    totalDuration: number;
  };
};

export type ApiSession = {
  /** "AAAA-MM-JJ" */
  date: string;
  /** km */
  distance: number;
  /** minutes */
  duration: number;
  heartRate: {
    min: number;
    max: number;
    average: number;
  };
  caloriesBurned: number;
};
