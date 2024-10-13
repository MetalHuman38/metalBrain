import { useMutation } from "@tanstack/react-query";
import { CreatePostAPI } from "./PostAPI";
import { IPost } from "./interface";
import { PostUseCase } from "./PostUseCase";

export const useCreatePost = () => {
  const createPostAPI = new CreatePostAPI();
  const createPostUseCase = new PostUseCase(createPostAPI);
  return useMutation({
    mutationFn: (post: IPost) => {
      return createPostUseCase.createPost(post);
    },
  });
};

export default { useCreatePost };
