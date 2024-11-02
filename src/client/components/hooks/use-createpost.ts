import { useQueryClient } from "@tanstack/react-query";
import { useCreatePost } from "@/client/services/react-query/posts/PostQueryAndMutation";
import { useCallback, useState } from "react";
import { IPost } from "@/client/services/react-query/posts/interface";

// ** Set up a robust hook to handle post creation ** //
export const useCreatePostHandler = () => {
  const queryClient = useQueryClient();
  const { mutateAsync } = useCreatePost(); // Use mutateAsync for async handling
  const [post, setPost] = useState<IPost | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // ** Handle post creation ** //
  const handlePostCreation = useCallback(
    async (post: IPost, token: string): Promise<IPost | null> => {
      try {
        const data = await mutateAsync(
          { post, token },
          {
            onSuccess: (data) => {
              setPost(data);
              queryClient.invalidateQueries({ queryKey: ["posts"] });
            },
          }
        );
        return data;
      } catch (error) {
        console.error("Error creating post", error);
        return null;
      }
    },
    [mutateAsync, queryClient]
  );

  return { post, setPost, token, setToken, handlePostCreation };
};

export default useCreatePostHandler;
