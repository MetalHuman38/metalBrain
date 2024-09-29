import StatCard from "@/client/components/shared/card/StatCard";
import { Header } from "@/client/components/shared/navigations";
import { useUserContext } from "@/client/services/context/user/UseContext";
import { getStatData } from "./statData";
import UserStats from "@/client/components/shared/charts/UserStats";
import { LoggedInUser } from "@/client/components/shared/card";
import {
  ReactIcons,
  FooterIcons,
} from "@/client/components/shared/react-icons";
import { Footer } from "@/client/components/shared/navigations";

const DashBoard = () => {
  const { user } = useUserContext();
  const stats = getStatData();

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <div className="">
        <Header title={`Welcome back, @${user?.username}!`} />
      </div>
      {/* Full width & height background with constrained content */}
      <main className="w-full">
        <div className="max-w-screen-2xl h-full py-6 px-4 sm:px-6 lg:px-8 xl:px-16">
          <StatCard stats={stats} />
          <div className="items-center p-8">
            <ReactIcons />
          </div>
          {/* CHARTS */}
          <div className="grid grid-cols-1 md:grid-cols-2 py-8 lg:grid-cols-2 gap-10">
            <UserStats />
            <LoggedInUser />
          </div>
          <div className="pt-8">
            <FooterIcons />
          </div>
          <div className="pt-14">
            <Footer />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashBoard;
