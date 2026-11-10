import achievementIcon from "~/assets/achievement.svg";
import { formatNumber } from "~/utils/format";

type TotalDistanceProps = {
  distance: number;
};

const TotalDistance = ({ distance }: TotalDistanceProps) => (
  <dl className="flex flex-wrap items-center gap-4.5">
    <dt className="text-body text-gray/60">Distance totale parcourue</dt>
    <dd className="flex items-center gap-4.75 rounded-[10px] bg-blue px-6.75 py-7 text-h4 whitespace-nowrap text-white">
      <img src={achievementIcon} alt="" width={34} height={34} />
      {formatNumber(distance)} km
    </dd>
  </dl>
);

export default TotalDistance;
