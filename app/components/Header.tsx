import { Link, NavLink } from "react-router";
import Logo from "~/components/Logo";
import { useSession } from "~/contexts/session";

const LINK_CLASS =
  "transition-colors duration-300 ease-[cubic-bezier(0.7,-0.4,0.4,1.4)] hover:text-blue focus-visible:text-blue aria-[current=page]:text-blue motion-reduce:transition-none";

const Header = () => {
  const { signOut } = useSession();

  return (
    <header className="flex flex-wrap items-center justify-between gap-4">
      <Link to="/dashboard" aria-label="SportSee, Dashboard">
        <Logo />
      </Link>
      <nav className="flex items-center gap-10 rounded-full bg-white/90 px-12 py-4 text-body">
        <ul className="flex gap-10 border-r-[0.5px] border-blue pr-10">
          <li>
            <NavLink to="/dashboard" className={LINK_CLASS}>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/mon-profil" className={LINK_CLASS}>
              Mon profil
            </NavLink>
          </li>
        </ul>
        {/* () => signOut() : sans flèche, l'événement du clic serait passé comme message */}
        <button
          type="button"
          onClick={() => signOut()}
          className="cursor-pointer text-blue"
        >
          Se déconnecter
        </button>
      </nav>
    </header>
  );
};

export default Header;
