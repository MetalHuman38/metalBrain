// ** This file contains get saved post hook *//
import { useGetAllSavedPosts } from "@/client/services/react-query/posts/PostQueryAndMutation";
import { useCallback, useState } from "react";
import { ISavedPost } from "@/client/services/react-query/posts/interface";

// ** Set up a robust hook to handle post saving ** //
export const useGetSavedPostHandler = () => {
  const [post, setPost] = useState<ISavedPost[]>([]);
  const { data: savedPosts } = useGetAllSavedPosts(post); // Use data for async handling

  // ** Handle post saving ** //
  const handleGetSavedPost = useCallback(
    async (post: ISavedPost[]) => {
      setPost(post);
    },
    [savedPosts]
  );
  return { savedPosts, setPost, handleGetSavedPost };
};

export default useGetSavedPostHandler;
