import { Link, NavLink } from "react-router";
import Logo from "~/components/Logo";

const linkClass =
  "hover:text-blue focus-visible:text-blue aria-[current=page]:text-blue";

const Header = () => (
  <header className="flex flex-wrap items-center justify-between gap-4">
    <Link to="/dashboard" aria-label="SportSee, Dashboard">
      <Logo />
    </Link>
    <nav className="flex items-center gap-10 rounded-full bg-white/90 px-12 py-4 text-body">
      <ul className="flex gap-10 border-r-[0.5px] border-blue pr-10">
        <li>
          <NavLink to="/dashboard" className={linkClass}>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/mon-profil" className={linkClass}>
            Mon profil
          </NavLink>
        </li>
      </ul>
      <button type="button" className="cursor-pointer text-blue">
        Se déconnecter
      </button>
    </nav>
  </header>
);

export default Header;
