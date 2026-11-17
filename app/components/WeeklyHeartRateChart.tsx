import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
} from "recharts";
import ChartCard from "~/components/ChartCard";
import ErrorMessage from "~/components/ErrorMessage";
import Loader from "~/components/Loader";
import PeriodNav from "~/components/PeriodNav";
import { BAR, GRID, X_AXIS, Y_AXIS } from "~/constants/charts";
import { useWeeklyHeartRate } from "~/hooks/use-weekly-heart-rate";
import { formatPeriod } from "~/utils/format";

type WeeklyHeartRateChartProps = {
  createdAt: Date;
};

/** Valeurs d'un jour (null si pas de séance) */
type HeartRateDay = {
  min: number | null;
  max: number | null;
  average: number | null;
};

/** Jours du lundi au dimanche : étiquette de l'axe X et nom lu par les lecteurs d'écran */
const DAYS = [
  { label: "Lun", name: "lundi" },
  { label: "Mar", name: "mardi" },
  { label: "Mer", name: "mercredi" },
  { label: "Jeu", name: "jeudi" },
  { label: "Ven", name: "vendredi" },
  { label: "Sam", name: "samedi" },
  { label: "Dim", name: "dimanche" },
];

const HEART_RATE_TICKS = [110, 140, 170, 200];

const getTitle = (average: number | null | undefined) => {
  if (average === undefined) return "";
  if (average === null) return "Aucune séance";
  return `${Math.round(average)} BPM`;
};

/** Libellé lu par les lecteurs d'écran : les valeurs de chaque jour avec séance */
const describeWeek = (days: HeartRateDay[]) => {
  const descriptions = days.flatMap((day, index) =>
    day.average === null
      ? []
      : `${DAYS[index].name} : min ${day.min}, max ${day.max}, moyenne ${Math.round(day.average)} BPM`,
  );
  if (descriptions.length === 0) return "Aucune séance cette semaine";

  return `Fréquence cardiaque par jour : ${descriptions.join(" ; ")}`;
};

/** Au survol du graphique : la courbe passe en bleu */
const LINE_HOVER =
  "[&_.recharts-line-curve]:transition-[stroke] [&_.recharts-line-curve]:duration-300 [&_.recharts-line-curve]:ease-[cubic-bezier(0.45,1.45,0.8,1)] motion-reduce:[&_.recharts-line-curve]:transition-none hover:[&_.recharts-line-curve]:stroke-blue";

const HeartRateLegend = () => (
  <ul className="flex gap-4 text-body-sm text-gray/60">
    <li className="flex items-center gap-[3.5px]">
      <span className="size-2 rounded-full bg-orange-30" aria-hidden="true" />
      Min BPM
    </li>
    <li className="flex items-center gap-[3.5px]">
      <span className="size-2 rounded-full bg-orange" aria-hidden="true" />
      Max BPM
    </li>
    <li className="flex items-center gap-[3.5px]">
      <span className="flex items-center gap-px" aria-hidden="true">
        <span className="h-px w-0.5 bg-blue-30" />
        <span className="size-1.25 rounded-full bg-blue" />
        <span className="h-px w-0.5 bg-blue-30" />
      </span>
      Moyenne BPM
    </li>
  </ul>
);

/** Graphique BPM : min, max et moyenne de chaque jour de la semaine */
const WeeklyHeartRateChart = ({ createdAt }: WeeklyHeartRateChartProps) => {
  const {
    data,
    error,
    isLoading,
    week,
    hasPrevious,
    hasNext,
    showPrevious,
    showNext,
  } = useWeeklyHeartRate(createdAt);

  const days = data?.days.map((day, index) => ({
    ...day,
    label: DAYS[index].label,
  }));

  return (
    <ChartCard
      title={getTitle(data?.average)}
      color="orange"
      subtitle="Fréquence cardiaque moyenne"
      period={
        <PeriodNav
          label={formatPeriod(week.start, week.end)}
          hasPrevious={hasPrevious}
          hasNext={hasNext}
          onPrevious={showPrevious}
          onNext={showNext}
        />
      }
    >
      {isLoading && !data && <Loader />}
      {error && <ErrorMessage message={error.message} />}

      {days && (
        <div
          aria-busy={isLoading}
          className={`flex h-full flex-col gap-4 ${isLoading ? "opacity-50 transition-opacity delay-200 duration-200 ease-linear" : ""}`}
        >
          <ComposedChart
            responsive
            role="img"
            aria-label={describeWeek(days)}
            className={LINE_HOVER}
            style={{ width: "100%", flex: 1, minHeight: 0 }}
            data={days}
            barGap={4}
            accessibilityLayer={false}
            margin={{ top: 5, right: 0, bottom: 0, left: 0 }}
          >
            <CartesianGrid {...GRID} />
            <XAxis {...X_AXIS} dataKey="label" />
            <YAxis
              {...Y_AXIS}
              domain={[HEART_RATE_TICKS[0], HEART_RATE_TICKS[3]]}
              ticks={HEART_RATE_TICKS}
              allowDataOverflow
            />
            <Bar {...BAR} dataKey="min" fill="var(--color-orange-30)" />
            <Bar {...BAR} dataKey="max" fill="var(--color-orange)" />
            <Line
              dataKey="average"
              type="monotone"
              connectNulls
              stroke="var(--color-lavender)"
              strokeWidth={3}
              dot={{ r: 3, fill: "var(--color-blue)", stroke: "none" }}
              activeDot={false}
            />
          </ComposedChart>
          <HeartRateLegend />
        </div>
      )}
    </ChartCard>
  );
};

export default WeeklyHeartRateChart;
