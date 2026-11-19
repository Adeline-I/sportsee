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
  /** Absent : personne n'est connecté */
  token?: string;
  signIn: (token: string) => void;
  /** @param message affiché sur la page de connexion (ex. session expirée) */
  signOut: (message?: string) => void;
};

const SessionContext = createContext<Session | null>(null);

/** Partage le token et les actions de connexion / déconnexion avec toute l'application */
export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  // getToken est appelée une seule fois, au premier affichage
  const [token, setToken] = useState(getToken);

  // Le cookie est écrit ou supprimé avant de changer de page : les middlewares des routes le lisent

  // useCallback : même fonction d'un affichage à l'autre (utile pour le useMemo plus bas)
  const signIn = useCallback(
    (newToken: string) => {
      saveToken(newToken);
      setToken(newToken);
      // replace : le bouton « Retour » ne ramène pas à la page de connexion
      navigate("/dashboard", { replace: true });
    },
    [navigate],
  );

  // useCallback : signOut est dans l'effet de useProtectedData, une nouvelle fonction relancerait le chargement
  const signOut = useCallback(
    (message?: string) => {
      removeToken();
      setToken(undefined);
      // replace : le bouton « Retour » ne ramène pas à la page quittée
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

/** Lit la session : à utiliser à la place de useContext(SessionContext) */
export const useSession = () => {
  const session = useContext(SessionContext);
  if (!session) {
    throw new Error("useSession doit être utilisé dans SessionProvider");
  }
  return session;
};
