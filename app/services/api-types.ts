// Réponses brutes de l'API, telles que le backend les renvoie

export type ApiLoginResponse = {
  token: string;
  userId: string;
};

export type ApiUserInfo = {
  profile: {
    firstName: string;
    lastName: string;
    createdAt: string; // "AAAA-MM-JJ"
    age: number;
    weight: number; // kg
    height: number; // cm
    profilePicture: string; // adresse de l'image
  };
  statistics: {
    totalDistance: string; // km, en texte : "2250.2"
    totalSessions: number;
    totalDuration: number; // minutes
  };
};

export type ApiSession = {
  date: string; // "AAAA-MM-JJ"
  distance: number; // km
  duration: number; // minutes
  heartRate: {
    min: number;
    max: number;
    average: number;
  };
  caloriesBurned: number;
};
