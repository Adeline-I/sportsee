import Logo from "~/components/Logo";
import type { Route } from "./+types/login";

export const meta: Route.MetaFunction = () => [
  { title: "Connexion – SportSee" },
];

const Login = () => (
  <>
    <Logo />
    <h1>Connexion</h1>
  </>
);

export default Login;
