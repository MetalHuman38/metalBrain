import { useMotion } from "@/client/components/hooks/use-motion";
import { StatItemsProps } from "./interface";

const StatItem = ({ title, value, color, icon }: StatItemsProps) => {
  const { motion, animations } = useMotion();
  return (
    <motion.div
      className={`shadow-lg rounded-lg p-4 ${color}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      variants={animations.staggerChild}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-center sm:p-2">
        <div className="flex items-center text-sm font-medium text-gray-900">
          <div className="flex items-center">
            <span>
              <img src={icon} alt={title} className="w-6 h-6" />
            </span>
          </div>
        </div>
      </div>
      <h3 className="text-lg font-semibold text-gray-400">{title}</h3>
      <p className={`mt-1 text-3xl font-semibold text-gray-100 ${color}`}>
        {value}
      </p>
    </motion.div>
  );
};

export default StatItem;
