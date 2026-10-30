import logoIcon from "~/assets/logo-icon.svg";

const Footer = () => (
  <footer className="bg-white px-4 py-2.5 text-body lg:px-8">
    <div className="mx-auto flex max-w-footer flex-wrap items-center justify-between gap-x-4 gap-y-2">
      <p className="flex gap-2.25">
        <span>©Sportsee</span>
        <span>Tous droits réservés</span>
      </p>
      <div className="flex items-center gap-4">
        <span>Conditions générales</span>
        <span>Contact</span>
        <img src={logoIcon} alt="" width={19} height={21} />
      </div>
    </div>
  </footer>
);

export default Footer;
