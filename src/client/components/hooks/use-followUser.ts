// Date: 07/20/2021
import { useDebounce } from "@/client/components/hooks/use-debounce";
import useRefreshStatus from "@/client/components/hooks/use-refreshstatus";
import {
  useFollowUserMutation,
  useUnfollowUserMutation,
} from "@/client/services/react-query/followQueryAndMutations/FollowQueryAndMutation";
import { Follow } from "@/client/services/react-query/followApiRepo/FollowEntity";
import { useFollow } from "@/client/components/hooks/use-follow";

export const useProfileFollowStatus = (currentuser: any, user: any) => {
  const debouncedFollower_id = useDebounce(String(user?.id) || "", 500);
  const debouncedFollowing_id = useDebounce(currentuser?.id || "", 500);
  const followUserMutation = useFollowUserMutation();
  const unfollowUserMutation = useUnfollowUserMutation();
  const {
    status,
    setStatus,
    isFollowing,
    handleFollow,
    handleUnfollow,
    followerCount,
    followingCount,
  } = useFollow(false, Number(debouncedFollowing_id));

  const { followStatus } = useRefreshStatus(
    Number(debouncedFollower_id),
    Number(debouncedFollowing_id),
    status
  );

  console.log("followStatus", followStatus);

  const handleFollowUser = async () => {
    if (!currentuser || !user) return;
    const follow = new Follow(
      Number(user.id),
      Number(currentuser.id),
      followStatus ? "unfollow" : "follow",
      new Date()
    );
    try {
      if (!followStatus?.status || followStatus?.status === "follow") {
        await followUserMutation.mutateAsync(follow);
        handleFollow();
      } else if (followStatus?.status === "following") {
        await unfollowUserMutation.mutateAsync(follow);
        handleUnfollow();
      }
    } catch (error) {
      console.log("Error following user", error);
    }
  };

  return {
    status,
    followStatus,
    setStatus,
    isFollowing,
    handleFollow,
    handleUnfollow,
    followUserMutation,
    unfollowUserMutation,
    handleFollowUser,
    followerCount,
    followingCount,
  };
};

export default { useProfileFollowStatus };
