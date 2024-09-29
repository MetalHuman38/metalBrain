import { Button } from "@/components/ui/button";
import { RouteAccess, sidebarLinks } from "@/client/services/admin/constants";
import { useUserContext } from "@/client/services/context/user/UseContext";
import { INavLink } from "@/client/types";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { useMotion } from "@/client/components/hooks/use-motion";
import { useLogoutUserMutation } from "@/client/services/react-query/userQueryAndMutations/UserQueriesMutations";
import { useEffect } from "react";

const LeftNavBar = () => {
  const { user } = useUserContext();
  const location = useLocation();
  const navigate = useNavigate();
  const { motion, animations, isOpen, toggleLeftSidebar } = useMotion();
  const { mutate: signOut, isSuccess } = useLogoutUserMutation();
  const { pathname } = location;

  useEffect(() => {
    if (isSuccess) {
      navigate(0); // Navigate to sign-in page on successful logout
      console.log("User logged out");
    }
  }, [isSuccess, navigate]);

  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link to="/dashboard" className="flex gap-3 items-center">
          <img
            src="/assets/images/logo.jpg"
            alt="logo"
            className="w-10 h-10"
            loading="lazy"
          />
        </Link>
        <motion.div
          className={`relative flex flex-center transition-all duration-300 ease-in-out flex-shrink-0 ${isOpen ? "w-56" : "w-14"}`}
        >
          <Button onClick={toggleLeftSidebar}>
            <motion.img
              src="/assets/icons/arrow.svg"
              alt="menu"
              loading="lazy"
              className={`h-12 w-12 ${isOpen ? "rotate-180" : ""}`}
              variants={animations.toggleCollapse}
              whileHover={{ scale: 1.1 }} // Hover effect
              whileTap={{ scale: 0.9 }} // Tap effect
            />
          </Button>
        </motion.div>
        {!user ? (
          <p>Loading user data....</p>
        ) : (
          <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
            <img
              src={
                user.profile_picture && user.profile_picture !== "null"
                  ? `${user.profile_picture}`
                  : user.avatarUrl
                    ? `${user.avatarUrl}`
                    : "/assets/images/profile-placeholder.svg"
              }
              alt="profile"
              className="w-14 h-14 rounded-full"
              loading="lazy"
            />
            <div className="flex flex-col">
              <p className="body-bold">
                {user.first_name} {user.last_name}
              </p>
              <p>@{user.username}</p>
            </div>
          </Link>
        )}
        <ul className="flex flex-col gap-6">
          {isOpen && (
            <motion.span className="divider" variants={animations.fadeIn} />
          )}
          {sidebarLinks.map((link: INavLink) => {
            const isActive = RouteAccess.isActive(pathname, link.route);
            const isExternalLink = RouteAccess.isExternalLink(
              link.target ?? ""
            );
            return (
              <motion.li
                key={link.label}
                className={`leftsidebar-link group ${isActive && "bg-primary-700"}`}
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {isExternalLink ? (
                  <a
                    href={link.route}
                    target="_blank"
                    rel="noreferrer"
                    className="flex gap-4 items-center p-4"
                  >
                    <img
                      src={link.imgURL}
                      alt={link.label}
                      loading="lazy"
                      className={`group-hover:invert-white ${isActive && "invert-white"}`}
                    />
                    {link.label}
                  </a>
                ) : (
                  <NavLink
                    to={link.route}
                    className="flex gap-4 items-center p-4"
                  >
                    <img
                      src={link.imgURL}
                      alt={link.label}
                      loading="lazy"
                      className={`group-hover:invert-white ${isActive && "invert-white"}`}
                    />
                    {link.label}
                  </NavLink>
                )}
              </motion.li>
            );
          })}
          <Button
            variant="ghost"
            className="shad-button_ghost"
            onClick={() => signOut(user?.id ?? "")}
          >
            <img src="/assets/icons/logout.svg" alt="logout" loading="lazy" />
            <p className="small-medium lg:base-medium">Logout</p>
          </Button>
        </ul>
      </div>
    </nav>
  );
};

export default LeftNavBar;
