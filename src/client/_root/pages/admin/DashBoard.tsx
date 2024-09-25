import StatCard from "@/client/components/shared/card/StatCard";
import { Header } from "@/client/components/shared/navigations";
import { useUserContext } from "@/client/services/context/user/UseContext";
import { getStatData } from "./statData";

const DashBoard = () => {
  const { user } = useUserContext();
  const stats = getStatData();
  return (
    <div className="flex-1 overflow-auto relative z-10 text-center">
      <Header title={`Hey, @${user?.username}!`} />
      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <StatCard stats={stats} />
        {/* CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <h2 className="text-2xl font-semibold text-gray-100">Charts</h2>
        </div>
      </main>
    </div>
  );
};

export default DashBoard;
