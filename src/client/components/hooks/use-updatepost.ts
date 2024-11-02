import { useCallback, useState } from "react";
import { useUpdatePost } from "@/client/services/react-query/posts/PostQueryAndMutation";
import { IUpdatePost } from "@/client/services/react-query/posts/interface";

// ** Set up a robust hook to handle post updates ** //
export const useUpdatePostHandler = () => {
  // ** Set up a state to store the updated post ** //
  const [updatedPost, setUpdatedPost] = useState<IUpdatePost | null>(null);
  const { mutate: updatePost } = useUpdatePost();

  // ** Handle updating a post by ID ** //
  const handleUpdatePost = useCallback(
    (post: IUpdatePost) => {
      updatePost(post, {
        onSuccess: () => {
          setUpdatedPost(post);
        },
      });
    },
    [updatePost, setUpdatedPost]
  );

  return { handleUpdatePost, updatedPost, setUpdatedPost };
};

export default useUpdatePostHandler;
