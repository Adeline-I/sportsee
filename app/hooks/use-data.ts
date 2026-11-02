// Hook générique : charge des données, suit le chargement et l'erreur

import { useEffect, useState } from "react";

// load doit rester la même entre deux affichages (useCallback)
export const useData = <T>(load: () => Promise<T>) => {
  const [result, setResult] = useState<{ data?: T; error?: Error }>({});

  useEffect(() => {
    let ignore = false; // passe à true si la demande devient obsolète

    load()
      .then((data) => {
        if (!ignore) setResult({ data });
      })
      .catch((error) => {
        if (!ignore) setResult({ error });
      });

    return () => {
      ignore = true;
    };
  }, [load]);

  // Ni données ni erreur : chargement en cours
  return { ...result, isLoading: !result.data && !result.error };
};
