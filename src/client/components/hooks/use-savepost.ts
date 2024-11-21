// ** This file contains save post hook *//
import { useQueryClient } from "@tanstack/react-query";
import { useSavePost } from "@/client/services/react-query/posts/PostQueryAndMutation";
import { useCallback, useState } from "react";
import { ISavedPost } from "@/client/services/react-query/posts/interface";

// ** Set up a robust hook to handle post saving ** //
export const useSavePostHandler = () => {
  const queryClient = useQueryClient();
  const { mutateAsync } = useSavePost(); // Use mutateAsync for async handling
  const [post, setPost] = useState<ISavedPost | null>(null);

  // ** Handle post saving ** //
  const handlePostSaving = useCallback(
    async (post: ISavedPost): Promise<ISavedPost | null> => {
      try {
        const data = await mutateAsync(post, {
          onSuccess: (data) => {
            setPost(data);
            queryClient.invalidateQueries({ queryKey: ["posts"] });
          },
        });
        return data;
      } catch (error) {
        console.error("Error saving post", error);
        return null;
      }
    },
    [mutateAsync, queryClient]
  );

  return { post, setPost, handlePostSaving };
};

export default useSavePostHandler;
