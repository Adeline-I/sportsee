// Fetch :  requêtes au backend.

// Adresse du backend, lue dans le fichier .env (ex. "http://localhost:8000")
const API_URL = import.meta.env.VITE_API_URL;

// Envoie une requête au backend et renvoie sa réponse.
// - path : la route appelée, ex. "/api/user-info"
// - token : à donner pour les routes protégées
// - body : les données à envoyer (seulement pour la connexion)
export const request = async (path: string, token?: string, body?: object) => {
  // 1. Préparer les en-têtes
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  // 2. Envoyer la requête
  let response: Response;
  try {
    response = await fetch(API_URL + path, {
      method: body ? "POST" : "GET",
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new Error("Impossible de joindre le serveur", { cause: 0 });
  }

  // 3. Le serveur a répondu, mais avec une erreur (code 400 ou plus)
  if (!response.ok) {
    const message =
      response.status === 401 || response.status === 403
        ? "Session expirée, veuillez vous reconnecter"
        : "Une erreur est survenue";
    throw new Error(message, { cause: response.status });
  }

  // 4. Tout va bien : on renvoie les données reçues
  return response.json();
};
