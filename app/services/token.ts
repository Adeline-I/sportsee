// Token de connexion, rangé dans un cookie

const COOKIE_NAME = "sportsee_token";
const MAX_AGE = 60 * 60 * 24; // 24 h en secondes, comme le token du backend

// path=/ : cookie disponible sur toutes les pages
// Secure : jamais transmis en HTTP non chiffré (localhost est toléré)
// SameSite=Strict : jamais transmis à un autre site
export const saveToken = (token: string) => {
  document.cookie = `${COOKIE_NAME}=${token}; path=/; max-age=${MAX_AGE}; Secure; SameSite=Strict`;
};
