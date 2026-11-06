import { Outlet, redirect } from "react-router";
import Footer from "~/components/Footer";
import Header from "~/components/Header";
import { getToken } from "~/services/token";
import type { Route } from "./+types/app-layout";

// Avant d'afficher une page connectée : sans token, retour à la connexion
// (le middleware tourne hors de React : il lit le cookie, pas le contexte)
export const clientMiddleware: Route.ClientMiddlewareFunction[] = [
  () => {
    if (!getToken()) throw redirect("/");
  },
];

const AppLayout = () => (
  <div className="flex min-h-screen flex-col">
    <div className="flex-1 px-4 pt-8.75 pb-20 lg:px-8">
      <div className="mx-auto flex max-w-page flex-col gap-27">
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
    <Footer />
  </div>
);

export default AppLayout;
