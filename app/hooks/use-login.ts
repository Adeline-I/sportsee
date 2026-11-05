// Hook de connexion : envoie les identifiants, puis confie le token à la session

import { useState } from "react";
import { useSession } from "~/contexts/session";
import { login as sendLogin } from "~/services/data-service";

export const useLogin = () => {
  const { signIn } = useSession();
  const [error, setError] = useState<Error>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const login = async (username: string, password: string) => {
    setError(undefined); // efface l'erreur de l'essai précédent
    setIsSubmitting(true);
    try {
      const { token } = await sendLogin(username, password);
      signIn(token); // cookie, contexte, puis dashboard
    } catch (error) {
      setError(error as Error); // les services ne lancent que des Error
      // Seulement en cas d'échec : après un succès, le formulaire reste désactivé jusqu'à l'affichage du dashboard
      setIsSubmitting(false);
    }
  };

  return { login, error, isSubmitting };
};
