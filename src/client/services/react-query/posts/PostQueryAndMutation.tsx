import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import CreatePostAPI from "./PostAPI";
import UpdatePostAPI from "./PostAPI";
import { IPost, IUpdatePost } from "./interface";
import { PostUseCase } from "./PostUseCase";
import { PostQueryKey } from "./PostQueryKey";

// ** Create Post ** //
export const useCreatePost = () => {
  const createPostAPI = new CreatePostAPI();
  const createPostUseCase = new PostUseCase(createPostAPI);
  return useMutation({
    mutationFn: ({ post, token }: { post: IPost; token: string }) => {
      return createPostUseCase.createPost(post, token);
    },
  });
};

// ** Update Post ** //
export const useUpdatePost = () => {
  const updatePostAPI = new UpdatePostAPI();
  const updatePostUseCase = new PostUseCase(updatePostAPI);
  const queryClient = new QueryClient();
  return useMutation({
    mutationFn: (post: IUpdatePost) => {
      return updatePostUseCase.updatePost(post);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [PostQueryKey.GET_POST, data?.id],
      });
    },
  });
};

// ** Get Post By Id ** //
export const useGetPostById = (id: number) => {
  const getPostAPI = new CreatePostAPI();
  const getPostUseCase = new PostUseCase(getPostAPI);
  return useQuery({
    queryKey: [PostQueryKey.GET_POST_BY_ID, id],
    queryFn: () => {
      return getPostUseCase.getPostById(id);
    },
    enabled: !!id,
  });
};

// ** Get Recent Post ** //
export const useGetRecentPost = (limit: number, offset: number) => {
  const getPostAPI = new CreatePostAPI();
  const getPostUseCase = new PostUseCase(getPostAPI);
  return useQuery({
    queryKey: [PostQueryKey.GET_RECENT_POST, limit, offset],
    queryFn: () => {
      return getPostUseCase.getRecentPost(limit, offset);
    },
  });
};

export default {
  useCreatePost,
  useUpdatePost,
  useGetPostById,
  useGetRecentPost,
};
