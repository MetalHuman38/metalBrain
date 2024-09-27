import StatCard from "@/client/components/shared/card/StatCard";
import { Header } from "@/client/components/shared/navigations";
import { useUserContext } from "@/client/services/context/user/UseContext";
import { getStatData } from "./statData";
import UserStats from "@/client/components/shared/charts/UserStats";
import { LoggedInUser } from "@/client/components/shared/card";

const DashBoard = () => {
  const { user } = useUserContext();
  const stats = getStatData();
  return (
    <div className="flex-1 overflow-auto relative z-10 text-center">
      <Header title={`Hey, @${user?.username}!`} />
      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8 xl:px-20">
        <StatCard stats={stats} />
        {/* CHARTS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 m-8 lg:grid-cols-2 gap-8">
          <UserStats />
          <LoggedInUser />
        </div>
      </main>
    </div>
  );
};

export default DashBoard;
