// ** This component is a placeholder for the react-icons library. ** //
import { useReactIcons } from "@/client/components/hooks/use-reacticons";
import { Link } from "react-router-dom";

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
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-14">
      <Link to="/admin/create-user" className="flex flex-col items-center">
        <FaUserPlus className="w-24 h-24 text-blue-500" />
        <p className="text-sm text-gray-100 mt-2">Create a User</p>
      </Link>

      {/* Other icons with consistent styling */}
      <Link to="/users" className="flex flex-col items-center">
        <FaUsers className="w-24 h-24 text-green-500" />
        <p className="text-sm text-gray-100 mt-2">View Users</p>
      </Link>

      <Link to="/admin/manage-roles" className="flex flex-col items-center">
        <FaUserShield className="w-24 h-24 text-red-500" />
        <p className="text-sm text-gray-100 mt-2">Manage Roles</p>
      </Link>

      <Link to="/dashboard" className="flex flex-col items-center">
        <MdDashboard className="w-24 h-24 text-yellow-500" />
        <p className="text-sm text-gray-100 mt-2">Dashboard</p>
      </Link>

      <Link to="/settings" className="flex flex-col items-center">
        <MdSettings className="w-24 h-24 text-purple-500" />
        <p className="text-sm text-gray-100 mt-2">Settings</p>
      </Link>

      <Link to="/security" className="flex flex-col items-center">
        <GiShield className="w-24 h-24 text-indigo-500" />
        <p className="text-sm text-gray-100 mt-2">Security</p>
      </Link>

      <Link to="/upgrade" className="flex flex-col items-center">
        <GiUpgrade className="w-24 h-24 text-pink-500" />
        <p className="text-sm text-gray-100 mt-2">Upgrade</p>
      </Link>

      <Link to="/admin/delete-user" className="flex flex-col items-center">
        <MdAutoDelete className="w-24 h-24 text-red-700" />
        <p className="text-sm text-gray-100 mt-2">Auto Delete</p>
      </Link>
    </div>
  );
};

export default ReactIcons;
