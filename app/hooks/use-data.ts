// Hook générique : charge des données protégées, suit le chargement et l'erreur

import { useEffect, useState } from "react";
import { useSession } from "~/contexts/session";

// load reçoit le token et doit rester la même entre deux affichages
export const useData = <T>(load: (token: string) => Promise<T>) => {
  const { token, signOut } = useSession();
  const [result, setResult] = useState<{ data?: T; error?: Error }>({});

  useEffect(() => {
    // Sécurité : aucune requête sans token (les middlewares l'évitent déjà)
    if (!token) return;

    let ignore = false; // passe à true si la demande devient obsolète

    load(token)
      .then((data) => {
        if (!ignore) setResult({ data });
      })
      .catch((error) => {
        if (ignore) return;
        // 401 / 403 : token absent, invalide ou expiré → déconnexion
        if (error.cause === 401 || error.cause === 403) {
          signOut(error.message);
        } else {
          setResult({ error });
        }
      });

    return () => {
      ignore = true;
    };
  }, [load, token, signOut]);

  // Ni données ni erreur : chargement en cours
  return { ...result, isLoading: !result.data && !result.error };
};
