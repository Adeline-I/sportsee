import type { Route } from "./+types/profile";

export const meta: Route.MetaFunction = () => [
  { title: "Mon profil – SportSee" },
];

const Profile = () => <h1>Mon profil</h1>;

export default Profile;
