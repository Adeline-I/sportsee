import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
} from "recharts";
import ChartCard from "~/components/ChartCard";
import ChartLegend from "~/components/ChartLegend";
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

/** Titre de la carte : vide pendant le premier chargement */
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
  "[&_.recharts-line-curve]:transition-[stroke] [&_.recharts-line-curve]:duration-300 [&_.recharts-line-curve]:ease-spring motion-reduce:[&_.recharts-line-curve]:transition-none hover:[&_.recharts-line-curve]:stroke-blue";

const LEGEND = [
  { label: "Min BPM", color: "bg-orange-30" },
  { label: "Max BPM", color: "bg-orange" },
  {
    label: "Moyenne BPM",
    symbol: (
      <span className="flex items-center gap-px">
        <span className="h-px w-0.5 bg-blue-30" />
        <span className="size-1.25 rounded-full bg-blue" />
        <span className="h-px w-0.5 bg-blue-30" />
      </span>
    ),
  },
];

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

  const days = data?.heartRates.map((day, index) => ({
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
      isLoading={isLoading}
      error={error}
    >
      {days && (
        <div className="flex h-full flex-col gap-4">
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
          <ChartLegend items={LEGEND} />
        </div>
      )}
    </ChartCard>
  );
};

export default WeeklyHeartRateChart;
