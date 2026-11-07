import StatCard from "~/components/StatCard";
import type { User } from "~/types";
import {
  formatDate,
  formatNumber,
  pluralize,
  splitDuration,
} from "~/utils/format";

type ProfileStatisticsProps = {
  statistics: User["statistics"];
  caloriesBurned: number;
  restDays: number;
  createdAt: Date;
};

const ProfileStatistics = ({
  statistics,
  caloriesBurned,
  restDays,
  createdAt,
}: ProfileStatisticsProps) => {
  const { hours, minutes } = splitDuration(statistics.totalDuration);

  const stats = [
    { label: "Temps total couru", value: `${hours}h`, unit: `${minutes}min` },
    {
      label: "Calories brûlées",
      value: formatNumber(caloriesBurned),
      unit: "cal",
    },
    {
      label: "Distance totale parcourue",
      value: formatNumber(statistics.totalDistance),
      unit: "km",
    },
    {
      label: "Nombre de jours de repos",
      value: formatNumber(restDays),
      unit: pluralize(restDays, "jour", "jours"),
    },
    {
      label: "Nombre de sessions",
      value: formatNumber(statistics.totalSessions),
      unit: pluralize(statistics.totalSessions, "session", "sessions"),
    },
  ];

  return (
    <section className="flex flex-col gap-8">
      <div>
        <h2 className="text-h4">Vos statistiques</h2>
        <p className="text-body text-gray/60">
          depuis le {formatDate(createdAt)}
        </p>
      </div>
      <dl className="grid grid-cols-2 gap-4.75">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </dl>
    </section>
  );
};

export default ProfileStatistics;
