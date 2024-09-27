import { RouteAccess, sidebarLinks } from "@/client/services/constants";
import { useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLogoutUserMutation } from "@/client/services/react-query/userQueryAndMutations/UserQueriesMutations";
import { INavLink } from "@/client/types";
import { useUserContext } from "@/client/services/context/user/UseContext";
import { useMotion } from "@/client/components/hooks/use-motion";

const LeftSideBar = () => {
  const { user, isUserLoading } = useUserContext();
  const { mutate: signOut, isSuccess } = useLogoutUserMutation();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { motion, animations, isOpen, toggleLeftSidebar } = useMotion(); // Use the hook

  useEffect(() => {
    if (isSuccess) {
      navigate(0); // Navigate to sign-in page on successful logout
      console.log("User logged out");
    }
  }, [isSuccess, navigate]);

  if (isUserLoading) {
    return <p>Loading user data...</p>;
  }

  if (!user) {
    return <p>Unable to load user data...</p>;
  }

  return (
    <motion.nav
      className={`leftsidebar`}
      initial="hidden"
      animate="visible"
      variants={animations.slideInFromLeft}
    >
      <div className="">
        <div className="flex gap-11 mb-8 justify-between">
          <Link to="/" className="flex gap-3 items-center">
            <img
              src="/assets/images/mylogo1.png"
              alt="logo"
              loading="lazy"
              width={50}
              height={36}
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
        </div>
        {!user ? (
          <p>Loading user data...</p>
        ) : (
          <Link to={`/profile/${user.id}`}>
            <img
              src={
                user?.profile_picture
                  ? `${user?.profile_picture}`
                  : user?.avatarUrl
                    ? `${user?.avatarUrl}`
                    : "/assets/icons/profile-placeholder.svg"
              }
              alt="profile"
              className="h-14 w-14 rounded-full"
              loading="lazy"
            />
            <div className="flex flex-col">
              <p className="body-bold">
                {user.first_name} {user?.last_name}
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
            // ** Role Based Access Helper *//
            if (!RouteAccess.hasAccess(link.allowedRoles, user.role))
              return null;
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
    </motion.nav>
  );
};

export default LeftSideBar;
