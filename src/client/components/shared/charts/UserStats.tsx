import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useMotion } from "../../hooks/use-motion";
import { IChartData } from "@/client/services/entities/user";
import { useGetUserActivities } from "../../hooks/use-getuseractivities";
import { getUserActivityChartData } from "../../hooks/use-getchartdata";

const UserStats = () => {
  const { userActivities, isLoading, error } = useGetUserActivities();
  const { motion } = useMotion();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!userActivities || userActivities.length === 0) {
    return <div>No user activities found!</div>;
  }
  // ** Get the chart data ** //
  const chartData: IChartData = getUserActivityChartData(userActivities);

  // ** Prepare data for the chart ** //
  const data = chartData.categories.map((date, index) => ({
    date,
    Posts: chartData.series[0].data[index],
    Comments: chartData.series[1].data[index],
    Likes: chartData.series[2].data[index],
    Follow: chartData.series[3].data[index],
    Unfollow: chartData.series[4].data[index],
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="charts"
    >
      <motion.div className="flex justify-center py-2">
        <h2 className="text-2xl font-semibold text-center text-gray-400">
          user activities
        </h2>
      </motion.div>
      <div className="items-center">
        <ResponsiveContainer
          width={"100%"}
          height={300}
          className="shadow-md rounded-lg items-center justify-center"
        >
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, bottom: 5, left: 0 }}
            className="shadow-md rounded-lg items-center"
            width={500}
            height={300}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#008080" />
            <XAxis dataKey="date" stroke="#FFFF00" />
            <YAxis stroke="#008000" />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",
                borderColor: "#6366F1",
              }}
              labelStyle={{ color: "#000" }}
              cursor={{ strokeDasharray: "3 3", stroke: "#008000" }}
            />
            <Line
              type="monotone"
              dataKey="Posts"
              stroke="#CD5C5C"
              strokeWidth={3}
              dot={{ fill: "#6366F1", strokeWidth: 2, r: 6 }}
              activeDot={{
                r: 8,
                strokeWidth: 2,
              }}
            />
            <Line
              type="monotone"
              dataKey="Comments"
              stroke="#008000"
              strokeWidth={3}
              dot={{ fill: "#6366F1", strokeWidth: 2, r: 6 }}
              activeDot={{
                r: 8,
                strokeWidth: 2,
              }}
            />
            <Line
              type="monotone"
              dataKey="Likes"
              stroke="#FF00FF"
              strokeWidth={3}
              dot={{ fill: "#6366F1", strokeWidth: 2, r: 6 }}
              activeDot={{
                r: 8,
                strokeWidth: 2,
              }}
            />
            <Line
              type="monotone"
              dataKey="Follow"
              stroke="#008080"
              strokeWidth={3}
              dot={{ fill: "#6366F1", strokeWidth: 2, r: 6 }}
              activeDot={{
                r: 8,
                strokeWidth: 2,
              }}
            />
            <Line
              type="monotone"
              dataKey="Unfollow"
              stroke="#ff0000"
              strokeWidth={3}
              dot={{ fill: "#008080", strokeWidth: 2, r: 6 }}
              activeDot={{
                r: 8,
                strokeWidth: 2,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default UserStats;
