const COOKIE_NAME = "sportsee_token";

/** 24 h en secondes, comme le token du backend */
const MAX_AGE = 60 * 60 * 24;

/** Range le token dans un cookie : toutes les pages (path=/), HTTPS seulement sauf localhost (Secure), jamais envoyé à un autre site (SameSite=Strict) */
export const saveToken = (token: string) => {
  document.cookie = `${COOKIE_NAME}=${token}; path=/; max-age=${MAX_AGE}; Secure; SameSite=Strict`;
};

/** Token du cookie, ou undefined s'il n'existe pas */
export const getToken = () =>
  // document.cookie : tous les cookies dans un seul texte, "a=1; b=2"
  document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(`${COOKIE_NAME}=`))
    ?.split("=")[1];

/** Supprime le cookie en le réécrivant avec une durée de vie nulle */
export const removeToken = () => {
  document.cookie = `${COOKIE_NAME}=; path=/; max-age=0`;
};
