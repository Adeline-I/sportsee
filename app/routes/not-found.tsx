import { Link } from "react-router";
import Button from "~/components/Button";
import Logo from "~/components/Logo";
import type { Route } from "./+types/not-found";

export const meta: Route.MetaFunction = () => [
  { title: "Page introuvable – SportSee" },
];

const NotFound = () => (
  <main className="flex min-h-screen flex-col items-center justify-center gap-10 px-4 text-center">
    <Link to="/dashboard" aria-label="SportSee, Dashboard">
      <Logo />
    </Link>
    <div className="flex flex-col gap-2">
      <h1 className="text-h4">Page introuvable</h1>
      <p className="text-body">La page que vous cherchez n'existe pas.</p>
    </div>
    <Button to="/dashboard">Retour au dashboard</Button>
  </main>
);

export default NotFound;
