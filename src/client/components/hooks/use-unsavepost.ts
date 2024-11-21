// ** This file contains unsave post hook *//
import { useQueryClient } from "@tanstack/react-query";
import { useUnSavePost } from "@/client/services/react-query/posts/PostQueryAndMutation";
import { useCallback, useState } from "react";
import { IUnSavedPost } from "@/client/services/react-query/posts/interface";

// ** Set up a robust hook to handle post un-saving ** //
export const useUnSavePostHandler = () => {
  const queryClient = useQueryClient();
  const { mutateAsync } = useUnSavePost(); // Use mutateAsync for async handling
  const [post, setPost] = useState<IUnSavedPost | null>(null);

  // ** Handle post un-saving ** //
  const handlePostUnSaving = useCallback(
    async (post: IUnSavedPost): Promise<IUnSavedPost | null> => {
      try {
        const data = await mutateAsync(post, {
          onSuccess: (data) => {
            setPost(data);
            queryClient.invalidateQueries({ queryKey: ["posts"] });
          },
        });
        return data;
      } catch (error) {
        console.error("Error un-saving post", error);
        return null;
      }
    },
    [mutateAsync, queryClient]
  );

  return { post, setPost, handlePostUnSaving };
};

export default useUnSavePostHandler;
