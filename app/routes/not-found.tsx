import type { Route } from "./+types/not-found";

export const meta: Route.MetaFunction = () => [
  { title: "Page introuvable – SportSee" },
];

const NotFound = () => <h1>Page introuvable</h1>;

export default NotFound;
