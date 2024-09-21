import { useEffect, useState } from "react";
import { useGetFollowerCountsQuery } from "@/client/services/react-query/followQueryAndMutations/FollowQueryAndMutation";
import { useDebounce } from "@/client/components/hooks/use-debounce";

export const useGetFollowCounts = (currentuser: any, user: any) => {
  const debouncedFollower_id = useDebounce(String(user?.id) || "", 500);
  const debouncedFollowing_id = useDebounce(currentuser?.id || "", 500);
  const { data: follower_count, refetch: refetchFollowerCount } =
    useGetFollowerCountsQuery(Number(debouncedFollowing_id));
  const { data: following_count, refetch: refetchFollowingCount } =
    useGetFollowerCountsQuery(Number(debouncedFollower_id));
  const [setFollowerCount, setFollowingCount] = useState<number>(0);

  useEffect(() => {
    if (currentuser?.id && user?.id) {
      refetchFollowerCount();
      refetchFollowingCount();
    }
  }, [currentuser?.id, user?.id]);

  return {
    follower_count,
    following_count,
    setFollowerCount,
    setFollowingCount,
  };
};

export default useGetFollowCounts;
