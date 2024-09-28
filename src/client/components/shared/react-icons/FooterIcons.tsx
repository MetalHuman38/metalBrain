import { useReactIcons } from "@/client/components/hooks/use-reacticons";
import { Link } from "react-router-dom";

export const FooterIcons = () => {
  const { MdOutlineMailLock, FaLinkedin, FaInstagramSquare } = useReactIcons();
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-14">
      <Link to="/admin" className="flex flex-col items-center">
        <MdOutlineMailLock className="w-14 h-14 text-blue-500" />
        <p className="text-sm text-gray-100 mt-2">info@metalbrain.net</p>
      </Link>

      {/* Other icons with consistent styling */}
      <Link to="/users" className="flex flex-col items-center">
        <FaLinkedin className="w-14 h-14 text-green-500" />
        <p className="text-sm text-gray-100 mt-2">Linkendln</p>
      </Link>

      <Link to="/roles" className="flex flex-col items-center">
        <FaInstagramSquare className="w-14 h-14 text-red-500" />
        <p className="text-sm text-gray-100 mt-2">socials</p>
      </Link>
    </div>
  );
};

export default FooterIcons;
