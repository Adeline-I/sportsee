import ErrorMessage from "~/components/ErrorMessage";
import Loader from "~/components/Loader";
import ProfileDetails from "~/components/ProfileDetails";
import ProfileStatistics from "~/components/ProfileStatistics";
import UserIdentity from "~/components/UserIdentity";
import { useProfile } from "~/hooks/use-user-data";
import type { Route } from "./+types/profile";

export const meta: Route.MetaFunction = () => [
  { title: "Mon profil – SportSee" },
];

const Profile = () => {
  const { data, error, isLoading } = useProfile();

  return (
    <>
      <h1 className="sr-only">Mon profil</h1>

      {isLoading && <Loader />}
      {error && <ErrorMessage message={error.message} />}

      {data && (
        <div className="grid gap-14.25 lg:grid-cols-[508fr_575fr]">
          <div className="flex flex-col gap-4">
            <div className="rounded-[10px] bg-white py-6 pr-13 pl-8 shadow-card">
              <UserIdentity profile={data.user.profile} className="gap-6" />
            </div>
            <ProfileDetails profile={data.user.profile} />
          </div>
          <ProfileStatistics
            statistics={data.user.statistics}
            caloriesBurned={data.caloriesBurned}
            restDays={data.restDays}
            createdAt={data.user.profile.createdAt}
          />
        </div>
      )}
    </>
  );
};

export default Profile;
