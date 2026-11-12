import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import ChartCard from "~/components/ChartCard";
import ErrorMessage from "~/components/ErrorMessage";
import Loader from "~/components/Loader";
import { useWeeklyDistances } from "~/hooks/use-user-data";
import { formatNumber, formatPeriod } from "~/utils/format";

type WeeklyDistanceChartProps = {
  createdAt: Date;
};

/** Textes des axes : gris à 60 % (#707070) */
const AXIS_TEXT = { fill: "var(--color-gray)", fillOpacity: 0.6 };

/** Lignes des axes : gris à 60 % */
const AXIS_LINE = { stroke: "var(--color-gray)", strokeOpacity: 0.6 };

/** Graphique km : distance de chaque semaine sur 4 semaines glissantes, et moyenne par semaine */
const WeeklyDistanceChart = ({ createdAt }: WeeklyDistanceChartProps) => {
  const { data, error, isLoading } = useWeeklyDistances(0, createdAt);

  const weeks = data?.weeks.map((week, index) => ({
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
        weeks && (
          <p className="text-body-sm">
            {formatPeriod(weeks[0].start, weeks[weeks.length - 1].end)}
          </p>
        )
      }
    >
      {isLoading && !data && <Loader />}
      {error && <ErrorMessage message={error.message} />}

      {weeks && (
        <div className="flex h-full flex-col gap-2">
          <BarChart
            responsive
            style={{ width: "100%", flex: 1, minHeight: 0 }}
            data={weeks}
            margin={{ top: 5, right: 0, bottom: 0, left: 0 }}
          >
            <CartesianGrid
              vertical={false}
              stroke="var(--color-gray)"
              strokeOpacity={0.06}
              strokeDasharray="2 2"
            />
            <XAxis
              dataKey="label"
              tickLine={false}
              tickSize={0}
              tickMargin={25}
              height={40}
              axisLine={AXIS_LINE}
              tick={{ ...AXIS_TEXT, fontSize: 12 }}
            />
            <YAxis
              width="auto"
              tickCount={4}
              allowDecimals={false}
              tickLine={false}
              tickSize={0}
              tickMargin={9}
              axisLine={AXIS_LINE}
              tick={{ ...AXIS_TEXT, fontSize: 10 }}
            />
            <Bar
              dataKey="distance"
              fill="var(--color-blue-30)"
              barSize={14}
              radius={30}
            />
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
