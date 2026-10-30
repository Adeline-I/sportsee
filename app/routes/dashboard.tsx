import type { Route } from "./+types/dashboard";

export const meta: Route.MetaFunction = () => [
  { title: "Dashboard – SportSee" },
];

const Dashboard = () => <h1>Dashboard</h1>;

export default Dashboard;
