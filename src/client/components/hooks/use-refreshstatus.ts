import { useEffect, useState } from "react";
import { useGetStatusQuery } from "@/client/services/react-query/followQueryAndMutations/FollowQueryAndMutation";
import { useDebounce } from "./use-debounce";

const useRefreshStatus = (
  follower_id: number,
  following_id: number,
  status: string
) => {
  const debouncedFollower_id = useDebounce(String(follower_id), 500);
  const debouncedFollowing_id = useDebounce(String(following_id) || "", 500);

  const {
    data: followStatus,
    isPending,
    error,
  } = useGetStatusQuery(
    Number(debouncedFollower_id),
    Number(debouncedFollowing_id)
  );

  const [initialStatus, setStatus] = useState(status);

  useEffect(() => {
    if (initialStatus && followStatus) {
      setStatus(followStatus.status);
    }
  }, [followStatus]);

  const refreshStatus = async () => {
    if (isPending || error) {
      return status;
    }
    return status === "follow" ? "following" : "follow";
  };

  return { refreshStatus, followStatus };
};

export default useRefreshStatus;
