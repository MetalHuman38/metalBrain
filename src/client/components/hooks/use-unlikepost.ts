// ** This file contains unlike post hook *//
import { useQueryClient } from "@tanstack/react-query";
import { useUnLikePost } from "@/client/services/react-query/posts/PostQueryAndMutation";
import { useCallback, useState } from "react";
import { IUnLikedPost } from "@/client/services/react-query/posts/interface";

// ** Set up a robust hook to handle post unliking ** //
export const useUnLikePostHandler = () => {
  const queryClient = useQueryClient();
  const { mutateAsync } = useUnLikePost();
  const [post, setPost] = useState<IUnLikedPost | null>(null);

  // ** Handle post unliking ** //
  const handlePostUnLiking = useCallback(
    async (post: IUnLikedPost): Promise<IUnLikedPost | null> => {
      try {
        const data = await mutateAsync(post, {
          onSuccess: (data) => {
            setPost(data);
            queryClient.invalidateQueries({ queryKey: ["posts"] });
          },
        });
        return data;
      } catch (error) {
        console.error("Error unliking post", error);
        return null;
      }
    },
    [mutateAsync, queryClient]
  );

  return { post, setPost, handlePostUnLiking };
};

export default useUnLikePostHandler;
