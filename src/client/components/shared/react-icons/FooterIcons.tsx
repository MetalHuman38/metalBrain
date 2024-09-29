import { useReactIcons } from "@/client/components/hooks/use-reacticons";
import { Link } from "react-router-dom";
import { useMotion } from "@/client/components/hooks/use-motion";

export const FooterIcons = () => {
  const { MdOutlineMailLock, FaLinkedin, FaInstagramSquare } = useReactIcons();
  const { motion } = useMotion();
  return (
    <motion.div
      className="grid grid-cols-2 md:grid-cols-4 gap-14"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <motion.div whileHover={{ scale: 1.1 }}>
        <Link to="/admin" className="flex flex-col items-center">
          <MdOutlineMailLock className="w-14 h-14 text-blue-500" />
          <p className="text-sm text-gray-100 mt-2">info@metalbrain.net</p>
        </Link>
      </motion.div>

      {/* Other icons with consistent styling */}
      <motion.div whileHover={{ scale: 1.1 }}>
        <Link to="/users" className="flex flex-col items-center">
          <FaLinkedin className="w-14 h-14 text-green-500" />
          <p className="text-sm text-gray-100 mt-2">Linkendln</p>
        </Link>
      </motion.div>

      <motion.div whileHover={{ scale: 1.1 }}>
        <Link to="/roles" className="flex flex-col items-center">
          <FaInstagramSquare className="w-14 h-14 text-red-500" />
          <p className="text-sm text-gray-100 mt-2">socials</p>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default FooterIcons;
