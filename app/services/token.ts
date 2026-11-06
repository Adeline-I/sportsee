// Token de connexion, rangé dans un cookie

const COOKIE_NAME = "sportsee_token";
const MAX_AGE = 60 * 60 * 24; // 24 h en secondes, comme le token du backend

// path=/ : cookie disponible sur toutes les pages
// Secure : jamais transmis en HTTP non chiffré (localhost est toléré)
// SameSite=Strict : jamais transmis à un autre site
export const saveToken = (token: string) => {
  document.cookie = `${COOKIE_NAME}=${token}; path=/; max-age=${MAX_AGE}; Secure; SameSite=Strict`;
};

// document.cookie renvoie tous les cookies
// On garde la valeur du nôtre, ou undefined s'il n'existe pas
export const getToken = () =>
  document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(`${COOKIE_NAME}=`))
    ?.split("=")[1];

// Un cookie se supprime en le réécrivant avec une durée de vie nulle
export const removeToken = () => {
  document.cookie = `${COOKIE_NAME}=; path=/; max-age=0`;
};
