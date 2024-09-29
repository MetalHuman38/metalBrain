// ** This component is a placeholder for the react-icons library. ** //
import { useReactIcons } from "@/client/components/hooks/use-reacticons";
import { Link } from "react-router-dom";
import { useMotion } from "@/client/components/hooks/use-motion";

// ** This Icons are functional and they are used for minimalistic design ** //
const ReactIcons = () => {
  const {
    FaUserPlus,
    FaUsers,
    FaUserShield,
    MdDashboard,
    MdSettings,
    GiShield,
    GiUpgrade,
    MdAutoDelete,
  } = useReactIcons();
  const { motion } = useMotion();
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-14">
      <motion.div whileHover={{ scale: 1.1 }}>
        <Link to="/admin/create-user" className="flex flex-col items-center">
          <FaUserPlus className="w-24 h-24 text-blue-500" />
          <p className="text-sm text-gray-100 mt-2">Create a User</p>
        </Link>
      </motion.div>

      {/* Other icons with consistent styling */}
      <motion.div whileHover={{ scale: 1.1 }}>
        <Link to="/admin/users" className="flex flex-col items-center">
          <FaUsers className="w-24 h-24 text-green-500" />
          <p className="text-sm text-gray-100 mt-2">View Users</p>
        </Link>
      </motion.div>

      <motion.div whileHover={{ scale: 1.1 }}>
        <Link to="/admin/manage-roles" className="flex flex-col items-center">
          <FaUserShield className="w-24 h-24 text-red-500" />
          <p className="text-sm text-gray-100 mt-2">Manage Roles</p>
        </Link>
      </motion.div>

      <motion.div whileHover={{ scale: 1.1 }}>
        <Link to="/admin/dashboard" className="flex flex-col items-center">
          <MdDashboard className="w-24 h-24 text-yellow-500" />
          <p className="text-sm text-gray-100 mt-2">Dashboard</p>
        </Link>
      </motion.div>

      <motion.div whileHover={{ scale: 1.1 }}>
        <Link to="/admin/settings" className="flex flex-col items-center">
          <MdSettings className="w-24 h-24 text-purple-500" />
          <p className="text-sm text-gray-100 mt-2">Settings</p>
        </Link>
      </motion.div>

      <motion.div whileHover={{ scale: 1.1 }}>
        <Link to="/admin/security" className="flex flex-col items-center">
          <GiShield className="w-24 h-24 text-indigo-500" />
          <p className="text-sm text-gray-100 mt-2">Security</p>
        </Link>
      </motion.div>

      <motion.div whileHover={{ scale: 1.1 }}>
        <Link to="/admin/upgrade" className="flex flex-col items-center">
          <GiUpgrade className="w-24 h-24 text-pink-500" />
          <p className="text-sm text-gray-100 mt-2">Upgrade</p>
        </Link>
      </motion.div>

      <motion.div whileHover={{ scale: 1.1 }}>
        <Link to="/admin/delete-user" className="flex flex-col items-center">
          <MdAutoDelete className="w-24 h-24 text-red-700" />
          <p className="text-sm text-gray-100 mt-2">Auto Delete</p>
        </Link>
      </motion.div>
    </div>
  );
};

export default ReactIcons;
