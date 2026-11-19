import type { User } from "~/types";
import { formatDate } from "~/utils/format";

type UserIdentityProps = {
  profile: User["profile"];
  /** Écart entre la photo et le texte : il change selon la page */
  className: string;
};

const UserIdentity = ({ profile, className }: UserIdentityProps) => (
  <div className={`flex items-center ${className}`}>
    {/* Cadre fixe : au survol, la photo grossit à l'intérieur sans le dépasser */}
    <div className="shrink-0 overflow-hidden rounded-[10px] shadow-card">
      <img
        src={profile.profilePicture}
        alt=""
        width={104}
        height={117}
        className="h-29.25 w-26 object-cover transition-transform duration-300 ease-out motion-safe:hover:scale-110"
      />
    </div>
    <div>
      <p className="text-h4">
        {profile.firstName} {profile.lastName}
      </p>
      <p className="text-body text-gray/60">
        Membre depuis le {formatDate(profile.createdAt)}
      </p>
    </div>
  </div>
);

export default UserIdentity;
