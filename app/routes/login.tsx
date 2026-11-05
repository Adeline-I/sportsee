import { useEffect, useState, type SubmitEvent } from "react";
import { redirect, useLocation, useNavigate } from "react-router";
import loginPhoto from "~/assets/login-photo.webp";
import Button from "~/components/Button";
import ErrorMessage from "~/components/ErrorMessage";
import Logo from "~/components/Logo";
import { useLogin } from "~/hooks/use-login";
import { getToken } from "~/services/token";
import type { Route } from "./+types/login";

export const meta: Route.MetaFunction = () => [
  { title: "Connexion – SportSee" },
];

// Déjà connecté : pas besoin du formulaire, direction le dashboard
export const clientMiddleware: Route.ClientMiddlewareFunction[] = [
  () => {
    if (getToken()) throw redirect("/dashboard");
  },
];

const fieldClass =
  "rounded-[10px] border-[0.5px] border-gray/60 bg-white p-5 text-body focus:border-blue focus:outline-hidden disabled:bg-gray-10 disabled:text-gray/60";

const Login = () => {
  const { login, error, isSubmitting } = useLogin();
  const navigate = useNavigate();
  const location = useLocation();

  // Message laissé par une déconnexion automatique (session expirée) : lu une seule fois et gardé
  const [sessionMessage] = useState<string | undefined>(
    location.state?.message,
  );

  // Puis effacé de l'historique : il ne réapparaît pas si on recharge la page
  useEffect(() => {
    if (location.state) navigate("/", { replace: true });
  }, [location.state, navigate]);

  // L'erreur de connexion passe avant le message de session
  const message = error?.message ?? sessionMessage;

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    login(String(formData.get("username")), String(formData.get("password")));
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-[1fr_auto]">
      <main className="flex flex-col gap-10 px-4 py-8 lg:px-8">
        <div className="xl:pl-17">
          <Logo />
        </div>
        <div className="my-auto flex w-full max-w-99.25 flex-col gap-10 self-center rounded-[20px] bg-white p-10 xl:pb-20">
          <h1 className="text-h3 text-blue">
            Transformez
            <br />
            vos stats en résultats
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <h2 className="text-h4">Se connecter</h2>
            <fieldset disabled={isSubmitting} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="username" className="text-body text-gray/60">
                  Identifiant
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  autoComplete="username"
                  className={fieldClass}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="password" className="text-body text-gray/60">
                  Mot de passe
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className={fieldClass}
                />
              </div>
              {message && <ErrorMessage message={message} />}
              <Button type="submit">Se connecter</Button>
            </fieldset>
            <p className="text-body">Mot de passe oublié ?</p>
          </form>
        </div>
      </main>
      <div className="relative hidden lg:block">
        <img
          src={loginPhoto}
          alt=""
          width={1616}
          height={2048}
          className="h-screen w-auto"
        />
        <p className="absolute right-6 bottom-7.25 rounded-[50px] bg-white p-4 text-center text-body-sm text-blue">
          Analysez vos performances en un clin d'œil,
          <br />
          suivez vos progrès et atteignez vos objectifs.
        </p>
      </div>
    </div>
  );
};

export default Login;
