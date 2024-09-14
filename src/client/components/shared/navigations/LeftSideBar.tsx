import { sidebarLinks } from "@/client/services/constants";
import { useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLogoutUserMutation } from "@/client/services/react-query/userQueryAndMutations/UserQueriesMutations";
import { INavLink } from "@/client/types";
import { useUserContext } from "@/client/services/context/user/UseContext";

const LeftSideBar = () => {
  const { user, isUserLoading } = useUserContext();
  const { mutate: signOut, isSuccess } = useLogoutUserMutation();
  const { pathname } = useLocation();
  const navigate = useNavigate();

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
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="/assets/images/mylogo1.png"
            alt="logo"
            loading="lazy"
            width={50}
            height={36}
          />
        </Link>
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
                {user.first_name} {user.last_name}
              </p>
              <p>@{user.username}</p>
            </div>
          </Link>
        )}

        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;
            const isExternalLink = link.target === "_blank";
            return (
              <li
                key={link.label}
                className={`leftsidebar-link group ${isActive && "bg-primary-700"}`}
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
              </li>
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

export default LeftSideBar;
