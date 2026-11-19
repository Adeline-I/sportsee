import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import Loader from "~/components/Loader";
import Logo from "~/components/Logo";
import { SessionProvider } from "~/contexts/session";
import type { Route } from "./+types/root";
import "./app.css";

/** Squelette HTML de toutes les pages, écrans de chargement et d'erreur compris */
export const Layout = ({ children }: { children: React.ReactNode }) => (
  <html lang="fr">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <Meta />
      <Links />
    </head>
    <body>
      {children}
      <ScrollRestoration />
      <Scripts />
    </body>
  </html>
);

/** Écran affiché pendant le démarrage de l'application */
export const HydrateFallback = () => (
  <main className="flex min-h-screen items-center justify-center">
    <Loader />
  </main>
);

/** Toutes les pages ont accès à la session */
const App = () => (
  <SessionProvider>
    <Outlet />
  </SessionProvider>
);

export default App;

/** Erreur inattendue : le détail n'est affiché qu'en développement */
export const ErrorBoundary = ({ error }: Route.ErrorBoundaryProps) => {
  const message =
    import.meta.env.DEV && error instanceof Error
      ? error.message
      : "Une erreur inattendue s'est produite.";

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-10 px-4 text-center">
      <Logo />
      <div className="flex flex-col gap-2">
        <h1 className="text-h4">Oups !</h1>
        <p className="text-body">{message}</p>
      </div>
    </main>
  );
};
