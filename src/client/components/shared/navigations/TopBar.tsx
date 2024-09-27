import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/client/services/context/user/UseContext";
import { useLogoutUserMutation } from "@/client/services/react-query/userQueryAndMutations/UserQueriesMutations";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMotion } from "@/client/components/hooks/use-motion";

const TopBar = () => {
  const { user, isUserLoading } = useUserContext();
  const { mutate: signOut, isSuccess } = useLogoutUserMutation();
  const navigate = useNavigate();
  const { motion, animations } = useMotion(); // Use the hook

  useEffect(() => {
    if (isSuccess) {
      navigate(0); // Navigate to sign-in page on successful logout
      console.log("User logged out");
    }
  }, [isSuccess, navigate]);

  if (isUserLoading) {
    return <p>Loading user data...</p>;
  }
  return (
    <motion.section
      className="topbar"
      initial="hidden"
      animate="visible"
      variants={animations.slideInFromTop}
    >
      <div className="flex-between py-4 px-5">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="/assets/images/mylogo1.png"
            alt="logo"
            loading="lazy"
            width={100}
            height={325}
          />
        </Link>
        <div className="flex gap-4">
          <Button
            variant="ghost"
            className="shad-button_ghost"
            onClick={() => signOut(user?.id ?? "")}
          >
            <img src="/assets/icons/logout.svg" alt="logout" />
          </Button>
          {user && ( // Check if user exists before rendering
            <Link to={`/profile/${user.id}`} className="flex-center gap-3">
              <img
                src={
                  user?.profile_picture
                    ? `${user?.profile_picture}`
                    : user?.avatarUrl
                      ? `${user?.avatarUrl}`
                      : "/assets/icons/profile-placeholder.svg"
                }
                alt="profile"
                className="h-8 w-8 rounded-full"
              />
            </Link>
          )}
        </div>
      </div>
    </motion.section>
  );
};

export default TopBar;
