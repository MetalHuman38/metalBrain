import { useUserContext } from "@/client/services/context/user/UseContext";
import { useState } from "react";

export const useFollow = (initialIsFollowing: boolean) => {
  // ** Access context values here ** //
  const {
    status,
    setStatus,
    followerCount,
    setFollowerCount,
    followingCount,
    setFollowingCount,
  } = useUserContext();

  const [isFollowing, setIsFollowing] = useState<boolean>(initialIsFollowing);
  const handleFollow = () => {
    if (status === "follow") {
      setFollowerCount((prev) => prev + 1); // ** Increase follower count ** //
      setIsFollowing(true); // Set to following
      setStatus("following"); // Update status
    }
  };

  // ** Handle unfollow action ** //
  const handleUnfollow = () => {
    if (status === "following") {
      setFollowerCount((prev) => Math.max(0, prev - 1)); // Decrease follower count
      setIsFollowing(false); // Set to not following
      setStatus("follow"); // Update status
    }
  };

  // Reset or handle self-status
  const handleSelfStatus = () => {
    // Set to self if user is viewing their own profile
  };

  return {
    isFollowing,
    followerCount,
    status,
    followingCount,
    setFollowingCount,
    handleFollow,
    handleUnfollow,
    handleSelfStatus,
    setIsFollowing,
    setFollowerCount,
    setStatus,
  };
};

export default useFollow;
