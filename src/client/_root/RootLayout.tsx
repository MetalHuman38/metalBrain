import { Outlet } from "react-router-dom";
import {
  BottomBar,
  LeftSideBar,
  TopBar,
} from "../components/shared/navigations";

const RootLayout = () => {
  return (
    <div className="w-full md:flex">
      <TopBar />
      <LeftSideBar />
      <section className="flex flex-1 h-full">
        <Outlet />
      </section>
      <BottomBar />
    </div>
  );
};

export default RootLayout;
