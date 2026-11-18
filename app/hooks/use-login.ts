import { useState } from "react";
import { useSession } from "~/contexts/session";
import { login } from "~/services/data-service";

/** Connexion : envoie les identifiants, puis confie le token à la session */
export const useLogin = () => {
  const { signIn } = useSession();
  const [error, setError] = useState<Error>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitLogin = async (username: string, password: string) => {
    setError(undefined); // efface l'erreur de l'essai précédent
    setIsSubmitting(true);
    try {
      const { token } = await login(username, password);
      signIn(token); // cookie, contexte, puis dashboard
    } catch (error) {
      setError(error as Error); // les services ne lancent que des Error
      // Seulement en cas d'échec : après un succès, le formulaire reste désactivé jusqu'à l'affichage du dashboard
      setIsSubmitting(false);
    }
  };

  return { submitLogin, error, isSubmitting };
};
