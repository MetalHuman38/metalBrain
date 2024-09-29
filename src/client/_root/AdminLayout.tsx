import { Outlet } from "react-router-dom";
import { LeftNavBar } from "../components/shared/navigations/admin";

const AdminLayout = () => {
  return (
    <div className="w-full md:flex">
      <LeftNavBar />
      <section className="flex flex-1 h-full">
        <Outlet />
      </section>
    </div>
  );
};

export default AdminLayout;
