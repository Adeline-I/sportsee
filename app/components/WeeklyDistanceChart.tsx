import {
  Bar,
  BarChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  type TooltipContentProps,
} from "recharts";
import ChartCard from "~/components/ChartCard";
import ErrorMessage from "~/components/ErrorMessage";
import Loader from "~/components/Loader";
import PeriodNav from "~/components/PeriodNav";
import { BAR, GRID, X_AXIS, Y_AXIS } from "~/constants/charts";
import { useWeeklyDistances } from "~/hooks/use-weekly-distances";
import type { Week } from "~/types";
import { formatDayMonth, formatNumber, formatPeriod } from "~/utils/format";

type WeeklyDistanceChartProps = {
  createdAt: Date;
};

type WeekBar = Week & { distance: number };

/** Au survol ou au focus du graphique : toutes les barres passent en bleu foncé */
const BARS_HOVER =
  "[&_.recharts-rectangle]:transition-[fill] [&_.recharts-rectangle]:duration-300 [&_.recharts-rectangle]:ease-[cubic-bezier(0.45,1.45,0.8,1)] motion-reduce:[&_.recharts-rectangle]:transition-none hover:[&_.recharts-rectangle]:fill-blue focus-within:[&_.recharts-rectangle]:fill-blue";

/** Infobulle : dates de la semaine et distance */
const DistanceTooltip = ({ active, payload }: TooltipContentProps) => {
  const week: WeekBar | undefined = payload?.[0]?.payload;

  return (
    <div role="status" aria-live="polite">
      {active && week && (
        <div className="flex -translate-x-1/2 flex-col gap-0.5 rounded-[10px] bg-black px-3.25 py-5.75 leading-tight text-gray-10 opacity-94 shadow-tooltip">
          <p className="text-body-sm">
            {formatDayMonth(week.start)} au {formatDayMonth(week.end)}
          </p>
          <p className="text-body-lg">{formatNumber(week.distance)} km</p>
        </div>
      )}
    </div>
  );
};

/** Graphique km : distance de chaque semaine sur 4 semaines glissantes, et moyenne par semaine */
const WeeklyDistanceChart = ({ createdAt }: WeeklyDistanceChartProps) => {
  const {
    data,
    error,
    isLoading,
    weeks,
    hasPrevious,
    hasNext,
    showPrevious,
    showNext,
  } = useWeeklyDistances(createdAt);

  const bars = data?.distances.map((week, index) => ({
    ...week,
    label: `S${index + 1}`,
  }));

  return (
    <ChartCard
      title={
        data ? `${formatNumber(Math.round(data.average))} km en moyenne` : ""
      }
      color="blue"
      subtitle="Total des kilomètres par semaine, sur 4 semaines glissantes"
      period={
        <PeriodNav
          label={formatPeriod(weeks[0].start, weeks[weeks.length - 1].end)}
          hasPrevious={hasPrevious}
          hasNext={hasNext}
          onPrevious={showPrevious}
          onNext={showNext}
        />
      }
    >
      {isLoading && !data && <Loader />}
      {error && <ErrorMessage message={error.message} />}

      {bars && (
        <div
          aria-busy={isLoading}
          className={`flex h-full flex-col gap-2 ${isLoading ? "opacity-50 transition-opacity delay-200 duration-200 ease-linear" : ""}`}
        >
          <BarChart
            responsive
            aria-label="Kilomètres par semaine"
            className={BARS_HOVER}
            style={{ width: "100%", flex: 1, minHeight: 0 }}
            data={bars}
            margin={{ top: 5, right: 0, bottom: 0, left: 0 }}
          >
            <CartesianGrid {...GRID} />
            <XAxis {...X_AXIS} dataKey="label" />
            <YAxis {...Y_AXIS} />
            <Tooltip
              content={DistanceTooltip}
              cursor={false}
              offset={{ x: 0, y: 10 }}
              allowEscapeViewBox={{ x: true, y: false }}
            />
            <Bar {...BAR} dataKey="distance" fill="var(--color-blue-30)" />
          </BarChart>
          <p className="flex items-center gap-[3.5px] text-body-sm text-gray/60">
            <span
              className="size-2 rounded-full bg-blue-50"
              aria-hidden="true"
            />
            Km
          </p>
        </div>
      )}
    </ChartCard>
  );
};

export default WeeklyDistanceChart;
