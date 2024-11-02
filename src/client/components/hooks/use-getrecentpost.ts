import { useGetRecentPost } from "@/client/services/react-query/posts/PostQueryAndMutation";
import { useCallback, useState } from "react";

// ** Set up get recent post hook ** //
export const useGetRecentPostHandler = () => {
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);

  // Fetch the recent post based on post_id
  const {
    data: recentPost,
    isLoading,
    isError,
  } = useGetRecentPost(limit, offset);

  // ** Handle fetching a recent post ** //
  const handleGetRecentPost = useCallback((limit: number, offset: number) => {
    setLimit(limit);
    setOffset(offset);
  }, []);

  return {
    recentPost,
    isLoading,
    isError,
    limit,
    offset,
    handleGetRecentPost,
  };
};
