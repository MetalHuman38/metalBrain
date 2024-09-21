// ** Type: Custom hook ** //
import { useState } from "react";
import { useGetFollowerCountsQuery } from "@/client/services/react-query/followQueryAndMutations/FollowQueryAndMutation";

export const useFollow = (initialIsFollowing: boolean, user_id: number) => {
  const [status, setStatus] = useState<"follow" | "following" | "block">(
    initialIsFollowing ? "following" : "follow"
  );

  const [isFollowing, setIsFollowing] = useState<"follow" | "following">(
    initialIsFollowing ? "follow" : "following"
  );

  const { data } = useGetFollowerCountsQuery(user_id);
  const followerCount = data?.follower_count ?? 0;
  const followingCount = data?.following_count ?? 0;

  // ** Handle follow action ** //
  const handleFollow = () => {
    setStatus("following"); // Update status
  };

  // ** Handle unfollow action ** //
  const handleUnfollow = () => {
    setStatus("follow"); // Update status
  };

  // Reset or handle self-status
  const handleSelfStatus = () => {
    // Set to self if user is viewing their own profile
  };

  return {
    isFollowing,
    handleFollow,
    handleUnfollow,
    handleSelfStatus,
    setIsFollowing,
    followerCount,
    followingCount,
    status,
    setStatus,
  };
};

export default useFollow;
