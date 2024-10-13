import { Button } from "@/components/ui/button";
import { RouteAccess, sidebarLinks } from "@/client/services/admin/constants";
import { useUserContext } from "@/client/services/context/user/UseContext";
import { INavLink } from "@/client/types";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useLogoutUserMutation } from "@/client/services/react-query/userQueryAndMutations/UserQueriesMutations";
import { useEffect } from "react";
import useMotion from "@/client/components/hooks/use-motion";

const LeftNavBar = () => {
  const { user } = useUserContext();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    isOpen,
    containerVariants,
    containerControls,
    handleOpenClose,
    svgVariants,
    svgControls,
  } = useMotion();

  const { mutate: signOut, isSuccess } = useLogoutUserMutation();
  const { pathname } = location;

  useEffect(() => {
    if (isSuccess) {
      navigate("/sign-in"); // Navigate to sign-in page on successful logout
    }
  }, [isSuccess, navigate]);

  return (
    <motion.nav
      className="leftsidebarAdmin"
      variants={containerVariants}
      animate={containerControls}
      initial="close"
    >
      {/* Sidebar Header with Toggle Button */}
      <motion.div className="flex items-center justify-between mb-8">
        <Link to="/dashboard" className="flex items-center gap-3">
          <motion.img
            src="/assets/images/logo.jpg"
            alt="logo"
            className="w-10 h-10"
            loading="lazy"
          />
        </Link>
        <Button onClick={handleOpenClose} className="flex items-center">
          <motion.img
            src="/assets/icons/arrow.svg"
            alt="menu"
            loading="lazy"
            width={24}
            height={24}
            variants={svgVariants}
            animate={svgControls}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </Button>
      </motion.div>

      {/* User Profile Section */}
      <motion.div
        className="mb-8 flex items-center transition-all duration-300"
        animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? "auto" : "0" }}
        initial={{ opacity: 0, height: 0 }}
      >
        {!user ? (
          <p>Loading user data...</p>
        ) : (
          <Link to={`/profile/${user.id}`} className="flex gap-2">
            <img
              src={
                user.profile_picture && user.profile_picture !== "null"
                  ? `${user.profile_picture}`
                  : user.avatarUrl
                    ? `${user.avatarUrl}`
                    : "/assets/images/profile-placeholder.svg"
              }
              alt="profile"
              className="w-10 h-10 rounded-full"
              loading="lazy"
            />
            {isOpen && (
              <div className="flex flex-col">
                <p className="font-bold">
                  {user.first_name} {user.last_name}
                </p>
                <p>@{user.username}</p>
              </div>
            )}
          </Link>
        )}
      </motion.div>

      {/* Sidebar Links */}
      <motion.ul
        className="flex flex-col gap-4 transition-all duration-300"
        animate={{ opacity: isOpen ? 1 : 0, width: isOpen ? "auto" : "0" }}
        initial={{ opacity: 0, width: 0 }}
      >
        {sidebarLinks.map((link: INavLink) => {
          const isActive = RouteAccess.isActive(pathname, link.route);
          const isExternalLink = RouteAccess.isExternalLink(link.target ?? "");

          return (
            <motion.li
              key={link.label}
              className={`leftsidebar-link group ${
                isActive ? "bg-primary-700" : ""
              } transition-all duration-300`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {isExternalLink ? (
                <a
                  href={link.route}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-4"
                >
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className={`group-hover:invert ${
                      isActive && "invert"
                    } transition-all duration-300`}
                  />
                  {isOpen && <span>{link.label}</span>}
                </a>
              ) : (
                <NavLink
                  to={link.route}
                  className="flex items-center gap-3 p-4"
                >
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className={`group-hover:invert ${
                      isActive && "invert"
                    } transition-all duration-300`}
                  />
                  {isOpen && <span>{link.label}</span>}
                </NavLink>
              )}
            </motion.li>
          );
        })}

        {/* Logout Button */}
        <motion.li
          className="items-center gap-3 transition-all duration-300"
          animate={{ opacity: isOpen ? 1 : 0 }}
          initial={{ opacity: 0 }}
        >
          <Button
            variant="ghost"
            className="shad-button_ghost flex items-center gap-3"
            onClick={() => signOut(user?.id ?? "")}
          >
            <img src="/assets/icons/logout.svg" alt="logout" />
            {isOpen && <p>Logout</p>}
          </Button>
        </motion.li>
      </motion.ul>
    </motion.nav>
  );
};

export default LeftNavBar;
