// Contexte de session : partage le token et les actions de connexion / déconnexion

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useNavigate } from "react-router";
import { getToken, removeToken, saveToken } from "~/services/token";

type Session = {
  token?: string; // absent = personne n'est connecté
  signIn: (token: string) => void;
  signOut: (message?: string) => void;
};

const SessionContext = createContext<Session | null>(null);

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  // getToken est appelée une seule fois, au premier affichage
  const [token, setToken] = useState(getToken);

  // Le cookie est toujours écrit ou supprimé avant de changer de page : les middlewares des routes le lisent pour autoriser ou rediriger

  // useCallback : signIn reste la même fonction (utile pour le useMemo plus bas)
  const signIn = useCallback(
    (newToken: string) => {
      saveToken(newToken);
      setToken(newToken);
      // replace : le bouton « Retour » ne ramène pas à la page de connexion
      navigate("/dashboard", { replace: true });
    },
    [navigate],
  );

  // useCallback : signOut est utilisée dans l'effet de useData, elle doit rester la même fonction pour ne pas relancer le chargement
  const signOut = useCallback(
    (message?: string) => {
      removeToken();
      setToken(undefined);
      // replace : le bouton « Retour » ne ramène pas à la page quittée
      // state : message à afficher sur la page de connexion (session expirée)
      navigate("/", { replace: true, state: { message } });
    },
    [navigate],
  );

  // useMemo : même objet tant que rien ne change, les composants qui lisent la session ne se réaffichent pas pour rien
  const session = useMemo(
    () => ({ token, signIn, signOut }),
    [token, signIn, signOut],
  );

  return <SessionContext value={session}>{children}</SessionContext>;
};

// Les composants lisent la session avec ce hook, jamais avec SessionContext directement
export const useSession = () => {
  const session = useContext(SessionContext);
  if (!session) {
    throw new Error("useSession doit être utilisé dans SessionProvider");
  }
  return session;
};
