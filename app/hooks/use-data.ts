import { useEffect, useState } from "react";
import { useSession } from "~/contexts/session";

/** Résultat d'un chargement, avec la fonction qui l'a produit */
type Result<T> = {
  load: (token: string) => Promise<T>;
  data?: T;
  error?: Error;
};

/**
 * Hook générique : charge des données protégées, suit le chargement et l'erreur.
 * `load` reçoit le token et doit rester la même tant que la demande ne change pas.
 * Quand `load` change, les anciennes données restent disponibles jusqu'à l'arrivée des nouvelles.
 */
export const useData = <T>(load: (token: string) => Promise<T>) => {
  const { token, signOut } = useSession();
  const [result, setResult] = useState<Result<T>>();

  useEffect(() => {
    // Sécurité : aucune requête sans token (les middlewares l'évitent déjà)
    if (!token) return;

    let ignore = false; // passe à true si la demande devient obsolète

    load(token)
      .then((data) => {
        if (!ignore) setResult({ load, data });
      })
      .catch((error) => {
        if (ignore) return;
        // 401 / 403 : token absent, invalide ou expiré → déconnexion
        if (
          error instanceof Error &&
          (error.cause === 401 || error.cause === 403)
        ) {
          signOut(error.message);
        } else {
          setResult({ load, error });
        }
      });

    return () => {
      ignore = true;
    };
  }, [load, token, signOut]);

  const isCurrent = result?.load === load;

  return {
    data: result?.data,
    error: isCurrent ? result?.error : undefined,
    isLoading: !isCurrent,
  };
};
