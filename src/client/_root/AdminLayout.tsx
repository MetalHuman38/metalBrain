import { Outlet } from "react-router-dom";
import { LeftNavBar } from "../components/shared/navigations/admin";
import { BottomBar, TopBar } from "../components/shared/navigations";

const AdminLayout = () => {
  return (
    <div className="w-full md:flex">
      <TopBar />
      <LeftNavBar />
      <section className="w-full h-full">
        <Outlet />
      </section>
      <BottomBar />
    </div>
  );
};

export default AdminLayout;
