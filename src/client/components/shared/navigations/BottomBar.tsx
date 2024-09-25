import { bottombarLinks } from "@/client/services/constants";
import { Link, useLocation } from "react-router-dom";
import { useMotion } from "@/client/components/hooks/use-motion";

const Bottombar = () => {
  const { pathname } = useLocation();
  const { motion, animations } = useMotion();

  return (
    <motion.section
      className="bottom-bar"
      initial="hidden"
      animate="visible"
      variants={animations.slideInFromBottom}
    >
      {bottombarLinks.map((link) => {
        const isActive = pathname === link.route;
        return (
          <Link
            to={link.route}
            key={link.label}
            className={`${isActive && "bg-primary-700 rounded-[10px]"} 
                                  flex-center flex-col gap-1 p-2 transition`}
          >
            <img
              src={link.imgURL}
              alt={link.label}
              width={16}
              height={16}
              className={`${isActive && "invert-white"}`}
              loading="lazy"
            />
            <p className="tiny-medium text-light-2">{link.label}</p>
          </Link>
        );
      })}
    </motion.section>
  );
};

export default Bottombar;
