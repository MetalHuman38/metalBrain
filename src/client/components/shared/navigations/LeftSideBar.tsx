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
  const {
    motion,
    animations,
    isOpen,
    containerVariants,
    containerControls,
    handleOpenClose,
    svgVariants,
    svgControls,
  } = useMotion(); // Use the hook

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
      className="leftsidebar"
      variants={containerVariants}
      animate={containerControls}
      initial="close"
    >
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
      <motion.div
        className="mb-8 flex items-center transition-all duration-300"
        animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? "auto" : "0" }}
        initial={{ opacity: 0, height: 0 }}
      >
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
              className="h-14 w-14 rounded-full mb-6"
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
      </motion.div>
      <motion.ul
        className="flex flex-col gap-4 transition-all duration-300"
        animate={{ opacity: isOpen ? 1 : 0, width: isOpen ? "auto" : "0" }}
        initial={{ opacity: 0, width: 0 }}
      >
        {isOpen && (
          <motion.span className="divider" variants={animations.fadeIn} />
        )}
        {sidebarLinks.map((link: INavLink) => {
          const isActive = RouteAccess.isActive(pathname, link.route);
          const isExternalLink = RouteAccess.isExternalLink(link.target ?? "");
          // ** Role Based Access Helper *//
          if (!RouteAccess.hasAccess(link.allowedRoles, user.role)) return null;
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
      </motion.ul>
    </motion.nav>
  );
};

export default LeftSideBar;
