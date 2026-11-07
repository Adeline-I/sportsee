import type { User } from "~/types";
import { formatDate } from "~/utils/format";

type UserIdentityProps = {
  profile: User["profile"];
};

const UserIdentity = ({ profile }: UserIdentityProps) => (
  <div className="flex items-center gap-6">
    <img
      src={profile.profilePicture}
      alt=""
      width={104}
      height={117}
      className="h-29.25 w-26 shrink-0 rounded-[10px] object-cover shadow-card"
    />
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
