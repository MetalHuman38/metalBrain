import { useEffect } from "react";
import { useDebounce } from "@/client/components/hooks/use-debounce";
import useRefreshStatus from "@/client/components/hooks/use-refreshstatus";
import {
  useFollowUserMutation,
  useUnfollowUserMutation,
} from "@/client/services/react-query/followQueryAndMutations/FollowQueryAndMutation";
import { Follow } from "@/client/services/react-query/followApiRepo/FollowEntity";
import { useFollow } from "@/client/components/hooks/use-follow";
import { useUserContext } from "@/client/services/context/user/UseContext";

export const useProfileFollowStatus = (currentuser: any, user: any) => {
  const debouncedFollower_id = useDebounce(String(user?.id) || "", 500);
  const debouncedFollowing_id = useDebounce(currentuser?.id || "", 500);
  const followUserMutation = useFollowUserMutation();
  const unfollowUserMutation = useUnfollowUserMutation();
  const { status, setStatus } = useUserContext();
  const { refreshStatus } = useRefreshStatus(
    new Follow(
      Number(debouncedFollower_id),
      Number(debouncedFollowing_id),
      status,
      new Date()
    )
  );

  const {
    followerCount,
    followingCount,
    setFollowingCount,
    isFollowing,
    setIsFollowing,
    setFollowerCount,
    handleFollow,
    handleUnfollow,
  } = useFollow(status === "follow");

  useEffect(() => {
    if (status) {
      setIsFollowing(status === "following");
      setStatus(status);
    }
    if (currentuser?.user) {
      setFollowerCount(currentuser?.followers?.length || 0);
      setFollowingCount(user?.following?.length || 0);
    }
  }, [currentuser, user, status]);

  const handleFollowUser = async () => {
    if (!currentuser || !user) return;
    const follow = new Follow(
      Number(user.id),
      currentuser.id,
      isFollowing ? "follow" : "following",
      new Date()
    );

    try {
      if (isFollowing && status === "following") {
        await unfollowUserMutation.mutateAsync(follow);
        handleUnfollow();
      } else if (!isFollowing && status === "follow") {
        await followUserMutation.mutateAsync(follow);
        handleFollow();
      }
      await refreshStatus();
      setIsFollowing(status === "following");
      setStatus(follow.status);
    } catch (error) {
      console.log("Error following user", error);
    }
  };

  return {
    status,
    setStatus,
    isFollowing,
    handleFollow,
    handleUnfollow,
    followUserMutation,
    unfollowUserMutation,
    refreshStatus,
    followerCount,
    followingCount,
    handleFollowUser,
  };
};

export default { useProfileFollowStatus };
