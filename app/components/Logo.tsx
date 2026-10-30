import logoIcon from "~/assets/logo-icon.svg";
import logoText from "~/assets/logo-text.svg";

const Logo = () => (
  <span className="flex items-center gap-1.25">
    <img src={logoIcon} alt="" width={19} height={21} />
    <img src={logoText} alt="SportSee" width={133} height={24} />
  </span>
);

export default Logo;
