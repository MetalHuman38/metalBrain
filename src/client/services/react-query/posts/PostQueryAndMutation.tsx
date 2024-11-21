import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import CreatePostAPI from "./PostAPI";
import UpdatePostAPI from "./PostAPI";
import {
  ILikedPost,
  IPost,
  ISavedPost,
  IUnLikedPost,
  IUnSavedPost,
  IUpdatePost,
} from "./interface";
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

// ** Save Post ** //
export const useSavePost = () => {
  const savePostAPI = new CreatePostAPI();
  const savePostUseCase = new PostUseCase(savePostAPI);
  return useMutation({
    mutationFn: (post: ISavedPost) => {
      return savePostUseCase.savePost(post);
    },
  });
};

// ** UnSave Post ** //
export const useUnSavePost = () => {
  const unsavePostAPI = new CreatePostAPI();
  const unsavePostUseCase = new PostUseCase(unsavePostAPI);
  return useMutation({
    mutationFn: (post: IUnSavedPost) => {
      return unsavePostUseCase.unSavePost(post);
    },
  });
};

// ** Get All Saved Posts ** //
export const useGetAllSavedPosts = (post: ISavedPost[]) => {
  const getSavedPostAPI = new CreatePostAPI();
  const getSavedPostUseCase = new PostUseCase(getSavedPostAPI);
  return useQuery({
    queryKey: [PostQueryKey.GET_SAVED_POST, post],
    queryFn: () => {
      return getSavedPostUseCase.getAllSavedPosts(post);
    },
  });
};

// ** Like Post ** //
export const useLikePost = () => {
  const likePostAPI = new CreatePostAPI();
  const likePostUseCase = new PostUseCase(likePostAPI);
  return useMutation({
    mutationFn: (post: ILikedPost) => {
      return likePostUseCase.likePost(post);
    },
  });
};

// ** UnLike Post ** //
export const useUnLikePost = () => {
  const unlikePostAPI = new CreatePostAPI();
  const unlikePostUseCase = new PostUseCase(unlikePostAPI);
  return useMutation({
    mutationFn: (post: IUnLikedPost) => {
      return unlikePostUseCase.unLikePost(post);
    },
  });
};

export default {
  useCreatePost,
  useUpdatePost,
  useGetPostById,
  useGetRecentPost,
  useSavePost,
  useUnSavePost,
  useLikePost,
  useUnLikePost,
  useGetAllSavedPosts,
};
