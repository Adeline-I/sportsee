import loginPhoto from "~/assets/login-photo.webp";
import Button from "~/components/Button";
import Logo from "~/components/Logo";
import type { Route } from "./+types/login";

export const meta: Route.MetaFunction = () => [
  { title: "Connexion – SportSee" },
];

const fieldClass =
  "rounded-[10px] border-[0.5px] border-gray/60 bg-white p-5 text-body focus:border-blue focus:outline-hidden";

const Login = () => (
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
        <form className="flex flex-col gap-6">
          <h2 className="text-h4">Se connecter</h2>
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="text-body text-gray/60">
              Identifiant
            </label>
            <input
              id="username"
              type="text"
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
              type="password"
              autoComplete="current-password"
              className={fieldClass}
            />
          </div>
          <Button>Se connecter</Button>
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

export default Login;
