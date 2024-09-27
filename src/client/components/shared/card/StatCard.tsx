import { useMotion } from "@/client/components/hooks/use-motion";
import { StatCardProps } from "./interface";
import StatItem from "./StatItem";

const StatCard = ({ stats }: StatCardProps) => {
  const { motion } = useMotion();
  return (
    <motion.div
      className="stats"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)" }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-8 gap-6">
        {stats.map((stat) => (
          <StatItem key={stat.title} {...stat} />
        ))}
      </div>
    </motion.div>
  );
};

export default StatCard;
