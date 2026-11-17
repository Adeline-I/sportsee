import WeeklyDistanceChart from "~/components/WeeklyDistanceChart";
import WeeklyHeartRateChart from "~/components/WeeklyHeartRateChart";

type LatestPerformancesProps = {
  createdAt: Date;
};

/** Section « Vos dernières performances » : les graphiques côte à côte */
const LatestPerformances = ({ createdAt }: LatestPerformancesProps) => (
  <section className="flex flex-col gap-8">
    <h2 className="text-h4">Vos dernières performances</h2>
    <div className="grid items-start gap-6 lg:grid-cols-[445fr_583fr]">
      <WeeklyDistanceChart createdAt={createdAt} />
      <WeeklyHeartRateChart createdAt={createdAt} />
    </div>
  </section>
);

export default LatestPerformances;
