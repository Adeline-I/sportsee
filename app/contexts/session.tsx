// Contexte de session : partage le token et les actions de connexion / déconnexion

import { createContext, useContext, useState, type ReactNode } from "react";
import { useNavigate } from "react-router";
import { getToken, removeToken, saveToken } from "~/services/token";

type Session = {
  token?: string; // absent = personne n'est connecté
  signIn: (token: string) => void;
  signOut: () => void;
};

const SessionContext = createContext<Session | null>(null);

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  // getToken est appelée une seule fois, au premier affichage
  const [token, setToken] = useState(getToken);

  // Le cookie est toujours écrit ou supprimé avant de changer de page : les middlewares des routes le lisent pour autoriser ou rediriger

  const signIn = (newToken: string) => {
    saveToken(newToken);
    setToken(newToken);
    // replace : le bouton « Retour » ne ramène pas à la page de connexion
    navigate("/dashboard", { replace: true });
  };

  const signOut = () => {
    removeToken();
    setToken(undefined);
    // replace : le bouton « Retour » ne ramène pas à la page quittée
    navigate("/", { replace: true });
  };

  return (
    <SessionContext value={{ token, signIn, signOut }}>
      {children}
    </SessionContext>
  );
};

// Les composants lisent la session avec ce hook, jamais avec SessionContext directement
export const useSession = () => {
  const session = useContext(SessionContext);
  if (!session) {
    throw new Error("useSession doit être utilisé dans SessionProvider");
  }
  return session;
};
