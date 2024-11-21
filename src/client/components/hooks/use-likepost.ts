// ** This file contains like post hook *//
import { useQueryClient } from "@tanstack/react-query";
import { useLikePost } from "@/client/services/react-query/posts/PostQueryAndMutation";
import { useCallback, useState } from "react";
import { ILikedPost } from "@/client/services/react-query/posts/interface";

// ** Set up a robust hook to handle post liking ** //
export const useLikePostHandler = () => {
  const queryClient = useQueryClient();
  const { mutateAsync } = useLikePost(); // Use mutateAsync for async handling
  const [post, setPost] = useState<ILikedPost | null>(null);

  // ** Handle post liking ** //
  const handlePostLiking = useCallback(
    async (post: ILikedPost): Promise<ILikedPost | null> => {
      try {
        const data = await mutateAsync(post, {
          onSuccess: (data) => {
            setPost(data);
            queryClient.invalidateQueries({ queryKey: ["posts"] });
          },
        });
        return data;
      } catch (error) {
        console.error("Error liking post", error);
        return null;
      }
    },
    [mutateAsync, queryClient]
  );

  return { post, setPost, handlePostLiking };
};
