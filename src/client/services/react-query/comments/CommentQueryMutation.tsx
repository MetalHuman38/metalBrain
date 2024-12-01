// ** This file contains comments Queries and Mutations ** //
import { useMutation, useQuery } from "@tanstack/react-query";
import { CommentAPI } from "./CommentAPI";
import { ICreateComment, IUpdateComment } from "./interface";
import { CommentUseCase } from "./CommentUseCase";
import { CommentQueryKey } from "./CommentQueryKey";

// ** Create Comment ** //
export const useCreateComment = () => {
  const createCommentAPI = new CommentAPI();
  const commentUseCase = new CommentUseCase(createCommentAPI);
  return useMutation({
    mutationFn: (comment: ICreateComment) => {
      return commentUseCase.createComment(comment);
    },
  });
};

// ** Update Comment ** //
export const useUpdateComment = () => {
  const updateCommentAPI = new CommentAPI();
  const commentUseCase = new CommentUseCase(updateCommentAPI);
  return useMutation({
    mutationFn: (comment: IUpdateComment) => {
      return commentUseCase.updateComment(comment);
    },
  });
};

// ** Get Comment by Id ** //
export const useGetCommentById = (id: number) => {
  const getCommentAPI = new CommentAPI();
  const commentUseCase = new CommentUseCase(getCommentAPI);
  return useQuery({
    queryKey: [CommentQueryKey.GET_COMMENT_BY_ID, id],
    queryFn: () => {
      return commentUseCase.getCommentById(id);
    },
    enabled: !!id,
  });
};

// ** Get Recent Comments ** //
export const useGetRecentComments = (
  post_id: number,
  limit: number,
  offset: number
) => {
  const getCommentAPI = new CommentAPI();
  const commentUseCase = new CommentUseCase(getCommentAPI);
  return useQuery({
    queryKey: [CommentQueryKey.RECENT_COMMENTS, post_id],
    queryFn: () => {
      return commentUseCase.getRecentComments(post_id, limit, offset);
    },
    enabled: !!post_id,
  });
};

// ** Create Reply ** //
export const useCreateReply = () => {
  const createReplyAPI = new CommentAPI();
  const commentUseCase = new CommentUseCase(createReplyAPI);
  return useMutation({
    mutationFn: (reply: ICreateComment) => {
      return commentUseCase.createReply(reply);
    },
  });
};

// ** Get Comment Replies ** //
export const useGetCommentReplies = (
  parent_comment_id: number,
  limit: number,
  offset: number
) => {
  const getCommentAPI = new CommentAPI();
  const commentUseCase = new CommentUseCase(getCommentAPI);
  return useQuery({
    queryKey: [CommentQueryKey.GET_COMMENT_REPLIES, parent_comment_id],
    queryFn: () => {
      return commentUseCase.getCommentReplies(parent_comment_id, limit, offset);
    },
    enabled: !!parent_comment_id,
  });
};

// ** Delete Comment ** //
export const useDeleteComment = () => {
  const deleteCommentAPI = new CommentAPI();
  const commentUseCase = new CommentUseCase(deleteCommentAPI);
  return useMutation({
    mutationFn: (id: number) => {
      return commentUseCase.deleteComment(id);
    },
  });
};

// ** Like Comment ** //
export const useLikeComment = () => {
  const likeCommentAPI = new CommentAPI();
  const commentUseCase = new CommentUseCase(likeCommentAPI);
  return useMutation({
    mutationFn: ({
      comment_id,
      user_id,
    }: {
      comment_id: number;
      user_id: number;
    }) => {
      return commentUseCase.likeComment(comment_id, user_id);
    },
  });
};

// ** Unlike Comment ** //
export const useUnlikeComment = () => {
  const unlikeCommentAPI = new CommentAPI();
  const commentUseCase = new CommentUseCase(unlikeCommentAPI);
  return useMutation({
    mutationFn: ({
      comment_id,
      user_id,
    }: {
      comment_id: number;
      user_id: number;
    }) => {
      return commentUseCase.unlikeComment(comment_id, user_id);
    },
  });
};

// ** Get Comment Likes ** //
export const useGetCommentLikes = (id: number) => {
  const getCommentLikesAPI = new CommentAPI();
  const commentUseCase = new CommentUseCase(getCommentLikesAPI);
  return useQuery({
    queryKey: [CommentQueryKey.GET_COMMENT_LIKES, id],
    queryFn: () => {
      return commentUseCase.getCommentLikes(id);
    },
    enabled: !!id,
  });
};

// ** Export all hooks ** //
export default {
  useCreateComment,
  useUpdateComment,
  useGetCommentById,
  useGetRecentComments,
  useCreateReply,
  useGetCommentReplies,
  useDeleteComment,
  useLikeComment,
  useUnlikeComment,
  useGetCommentLikes,
};
