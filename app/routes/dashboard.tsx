import CurrentWeek from "~/components/CurrentWeek";
import ErrorMessage from "~/components/ErrorMessage";
import Loader from "~/components/Loader";
import TotalDistance from "~/components/TotalDistance";
import UserIdentity from "~/components/UserIdentity";
import { useDashboard } from "~/hooks/use-user-data";
import type { Route } from "./+types/dashboard";

export const meta: Route.MetaFunction = () => [
  { title: "Dashboard – SportSee" },
];

const Dashboard = () => {
  const { data, error, isLoading } = useDashboard();

  return (
    <>
      <h1 className="sr-only">Dashboard</h1>

      {isLoading && <Loader />}
      {error && <ErrorMessage message={error.message} />}

      {data && (
        <div className="flex flex-col gap-27 xl:px-11">
          <div className="flex flex-wrap items-center justify-between gap-6 rounded-[20px] bg-linear-to-t from-white/0 to-white px-6 py-8 lg:px-13">
            <UserIdentity profile={data.user.profile} className="gap-9.5" />
            <TotalDistance distance={data.user.statistics.totalDistance} />
          </div>
          <CurrentWeek
            start={data.week.start}
            end={data.week.end}
            duration={data.week.duration}
            distance={data.week.distance}
          />
        </div>
      )}
    </>
  );
};

export default Dashboard;
