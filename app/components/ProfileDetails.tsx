import type { User } from "~/types";
import { formatHeight } from "~/utils/format";

type ProfileDetailsProps = {
  profile: User["profile"];
};

const ProfileDetails = ({ profile }: ProfileDetailsProps) => {
  const details = [
    { label: "Âge", value: profile.age },
    { label: "Genre", value: "Non renseigné" }, // non renvoyé par l'API
    { label: "Taille", value: formatHeight(profile.height) },
    { label: "Poids", value: `${profile.weight}kg` },
  ];

  return (
    <section className="rounded-[10px] bg-white px-7 pt-10 pb-15 shadow-card">
      <h2 className="border-b border-gray-10 pb-6 text-h4">Votre profil</h2>
      <dl className="mt-8 flex flex-col gap-6 text-body-lg text-gray/60">
        {details.map(({ label, value }) => (
          <div key={label} className="flex gap-1">
            <dt>{label} :</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
};

export default ProfileDetails;
