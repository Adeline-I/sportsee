import { Outlet } from "react-router";
import Footer from "~/components/Footer";
import Header from "~/components/Header";

const AppLayout = () => (
  <div className="flex min-h-screen flex-col">
    <div className="flex-1 px-4 pt-8.75 pb-20 lg:px-8">
      <div className="mx-auto flex max-w-page flex-col gap-27">
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
    <Footer />
  </div>
);

export default AppLayout;
