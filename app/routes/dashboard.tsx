import ErrorMessage from "~/components/ErrorMessage";
import Loader from "~/components/Loader";
import TotalDistance from "~/components/TotalDistance";
import UserIdentity from "~/components/UserIdentity";
import { useUserInfo } from "~/hooks/use-user-data";
import type { Route } from "./+types/dashboard";

export const meta: Route.MetaFunction = () => [
  { title: "Dashboard – SportSee" },
];

const Dashboard = () => {
  const { data, error, isLoading } = useUserInfo();

  return (
    <>
      <h1 className="sr-only">Dashboard</h1>

      {isLoading && <Loader />}
      {error && <ErrorMessage message={error.message} />}

      {data && (
        <div className="xl:px-11">
          <div className="flex flex-wrap items-center justify-between gap-6 rounded-[20px] bg-linear-to-t from-white/0 to-white px-6 py-8 lg:px-13">
            <UserIdentity profile={data.profile} className="gap-9.5" />
            <TotalDistance distance={data.statistics.totalDistance} />
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
