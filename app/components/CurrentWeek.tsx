import WeeklyGoal from "~/components/WeeklyGoal";
import WeekStat from "~/components/WeekStat";
import { formatNumber, formatShortDate, pluralize } from "~/utils/format";

type CurrentWeekProps = {
  start: Date;
  end: Date;
  sessions: number;
  goal: number;
  duration: number;
  distance: number;
};

const CurrentWeek = ({
  start,
  end,
  sessions,
  goal,
  duration,
  distance,
}: CurrentWeekProps) => (
  <section className="flex flex-col gap-8">
    <div className="flex flex-col gap-2.25">
      <h2 className="text-h4">Cette semaine</h2>
      <p className="text-body-lg text-gray/60">
        Du {formatShortDate(start)} au {formatShortDate(end)}
      </p>
    </div>
    <div className="grid items-start gap-7.5 lg:grid-cols-[450fr_572fr]">
      <WeeklyGoal done={sessions} goal={goal} />
      <dl className="flex flex-col gap-4">
        <WeekStat
          label="Durée d'activité"
          value={formatNumber(duration)}
          unit={pluralize(duration, "minute", "minutes")}
          color="blue"
        />
        <WeekStat
          label="Distance"
          value={formatNumber(distance)}
          unit={pluralize(distance, "kilomètre", "kilomètres")}
          color="orange"
        />
      </dl>
    </div>
  </section>
);

export default CurrentWeek;
