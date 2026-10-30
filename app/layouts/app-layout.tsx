import { Outlet } from "react-router";
import Header from "~/components/Header";

const AppLayout = () => (
  <div className="mx-auto box-content flex max-w-page flex-col gap-27 px-4 pt-8.75 lg:px-8">
    <Header />
    <main>
      <Outlet />
    </main>
  </div>
);

export default AppLayout;
