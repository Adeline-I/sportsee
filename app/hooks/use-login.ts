// Hook de connexion : envoie les identifiants, garde le token, puis ouvre le dashboard.

import { useState } from "react";
import { useNavigate } from "react-router";
import { login as sendLogin } from "~/services/data-service";
import { saveToken } from "~/services/token";

export const useLogin = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<Error>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const login = async (username: string, password: string) => {
    setError(undefined); // efface l'erreur de l'essai précédent
    setIsSubmitting(true);
    try {
      const { token } = await sendLogin(username, password);
      saveToken(token);
      // replace : le bouton « Retour » ne ramène pas au formulaire
      navigate("/dashboard", { replace: true });
    } catch (error) {
      setError(error as Error); // les services ne lancent que des Error
    } finally {
      setIsSubmitting(false);
    }
  };

  return { login, error, isSubmitting };
};
