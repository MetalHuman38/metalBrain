import { useUserContext } from "@/client/services/context/user/UseContext";
import StatBlock from "../StatBlock";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useGetCurrentUserQuery } from "@/client/services/react-query/userQueryAndMutations/UserQueriesMutations";
import { useEffect } from "react";
import { useProfileFollowStatus } from "@/client/components/hooks/use-followUser";

const Profile = () => {
  const { user } = useUserContext();
  const { id } = useParams();
  const { data: currentuser } = useGetCurrentUserQuery(id as string);
  const {
    followUserMutation,
    unfollowUserMutation,
    refreshStatus,
    status,
    followerCount,
    followingCount,
    isFollowing,
    handleFollowUser,
  } = useProfileFollowStatus(currentuser, user);

  useEffect(() => {
    if (currentuser?.user && user) {
      refreshStatus();
    }
  }, [currentuser, user]);

  return (
    <div className="profile-container">
      <div className="profile-inner_container">
        <div className="flex xl:flex-row flex-col max-xl:items-center flex-1 gap-7">
          <img
            src={
              currentuser?.profile_picture
                ? `${currentuser?.profile_picture}`
                : currentuser?.avatarUrl
                  ? `${currentuser?.avatarUrl}`
                  : "/assets/icons/profile-placeholder.svg"
            }
            alt="profile"
            className="w-28 h-28 lg:h-36 lg:w-36 rounded-full"
          />
          <div className="flex flex-col flex-1 justify-between md:mt-2">
            <div className="flex flex-col w-full">
              <h1 className="text-center xl:text-left h3-bold md:h1-semibold w-full">
                {currentuser?.first_name} {currentuser?.last_name}
              </h1>
              <p className="small-regular md:body-medium text-light-3 text-center xl:text-left">
                @{currentuser?.username}
              </p>
            </div>
            <div className="flex gap-8 mt-10 items-center justify-center xl:justify-start flex-wrap z-20">
              <StatBlock value={followerCount} label="Followers" />
              <StatBlock value={followingCount} label="Following" />
            </div>
            <p className="small-medium md:base-medium text-center xl:text-left mt-7 max-w-screen-sm">
              {user?.bio}
            </p>
          </div>
          <div className="flex justify-center gap-4">
            <div className={`${user?.id !== currentuser?.id && "hidden"}`}>
              <Link
                to={`/update-profile/${currentuser?.id}`}
                className={`h-12 bg-dark-4 px-5 text-light-1 flex-center gap-2 rounded-lg ${
                  user?.id !== currentuser?.id && "hidden"
                }`}
              >
                <img
                  src={"/assets/icons/edit.svg"}
                  alt="edit"
                  width={20}
                  height={20}
                />
                <p className="flex whitespace-nowrap small-medium">
                  Edit Profile
                </p>
              </Link>
            </div>
            <div className={`${user?.id === currentuser?.id && "hidden"}`}>
              <Button
                type="button"
                className="shad-button_primary px-8"
                onClick={handleFollowUser}
                disabled={
                  followUserMutation.isPending || unfollowUserMutation.isPending
                }
              >
                {isFollowing
                  ? status === "following"
                    ? "Following"
                    : "Follow"
                  : "Follow"}
              </Button>
              {followUserMutation.error && (
                <p>Error: {(followUserMutation.error as Error).message}</p>
              )}
              <div className="py-2 flex justify-center">
                <p className="text-lg font-semibold text-light-3">
                  {isFollowing && status === "following"
                    ? `following ${currentuser?.username}`
                    : `not following ${currentuser?.username}`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
