import { useEffect, useRef, useState } from "react";
import { useGetFollowerCountsQuery } from "@/client/services/react-query/followQueryAndMutations/FollowQueryAndMutation";
import { useDebounce } from "@/client/components/hooks/use-debounce";

export const useGetFollowCounts = (currentuser: any, user: any) => {
  const debouncedFollower_id = useDebounce(String(user?.id) || "", 500);
  const debouncedFollowing_id = useDebounce(currentuser?.id || "", 500);
  const { data: follower_count, refetch: refetchFollowerCount } =
    useGetFollowerCountsQuery(Number(debouncedFollowing_id));
  const { data: following_count, refetch: refetchFollowingCount } =
    useGetFollowerCountsQuery(Number(debouncedFollower_id));
  const [followerCount, setFollowerCount] = useState<number>(0);
  const [followingCount, setFollowingCount] = useState<number>(0);

  const hasFetched = useRef(false);

  useEffect(() => {
    if (currentuser?.id && user?.id && !hasFetched.current) {
      refetchFollowerCount();
      refetchFollowingCount();
      hasFetched.current = true;
    }
  }, [currentuser?.id, user?.id, refetchFollowerCount, refetchFollowingCount]);

  useEffect(() => {
    if (typeof follower_count === "number") setFollowerCount(follower_count);
    if (typeof following_count === "number") setFollowingCount(following_count);
  }, [follower_count, following_count]);

  return {
    follower_count,
    following_count,
    followerCount,
    followingCount,
    setFollowerCount,
    setFollowingCount,
  };
};

export default useGetFollowCounts;
