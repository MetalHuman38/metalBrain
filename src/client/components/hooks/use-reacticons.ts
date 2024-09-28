// useReactIcons.js
import { FaUserPlus, FaUsers, FaUserShield, FaLinkedin } from "react-icons/fa6"; // FontAwesome icons
import {
  MdDashboard,
  MdSettings,
  MdAutoDelete,
  MdOutlineMailLock,
} from "react-icons/md"; // Material Icons
import { GiShield, GiUpgrade } from "react-icons/gi"; // Game Icons
import { FaInstagramSquare } from "react-icons/fa"; // FontAwesome icons

export const useReactIcons = () => {
  return {
    FaUserPlus,
    FaUsers,
    FaUserShield,
    MdDashboard,
    MdSettings,
    GiShield,
    GiUpgrade,
    MdAutoDelete,
    MdOutlineMailLock,
    FaLinkedin,
    FaInstagramSquare,
  };
};

export default useReactIcons;
