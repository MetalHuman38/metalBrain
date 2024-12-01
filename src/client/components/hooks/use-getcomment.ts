// ** This file contains the useGetComment and comment replies hooks ** //
import { useCallback } from "react";
import {
  useGetRecentComments,
  useGetCommentReplies,
  useGetCommentById
} from "@/client/services/react-query/comments/CommentQueryMutation";

// ** Set up get comment hook ** //
export const useGetCommentHandler = (post_id: number, parent_comment_id: number, limit: number, offset: number) => {

  // Fetch the recent comment based on comment_id
  const {
    data: recentComment,
    isLoading,
    isError,
  } = useGetRecentComments(post_id, limit, offset);

  console.log("Recent comment", recentComment);

  const {
    data: commentReplies,
    isLoading: isReplyLoading,
    isError: isReplyError,
  } = useGetCommentReplies(parent_comment_id, limit, offset);

  console.log("Comment replies", commentReplies);

  const { data: commentById } = useGetCommentById(parent_comment_id);

  console.log("Comment by id", commentById);

  // ** Handle fetching a comment ** //
  const handleGetComment = useCallback((newPost_id: number) => {
    console.log("New post id", newPost_id);
  }, []);

  // ** Get comment replies ** //
  const handleGetCommentReplies = useCallback((newParentComment_id: number) => {
    console.log("New parent comment id", newParentComment_id);
  }, []);

  // ** Get comment by id ** //
  const handleGetCommentById = useCallback((newComment_id: number) => {
    console.log("New comment id", newComment_id);
  }, []);

  return {
    recentComment,
    commentReplies,
    isReplyLoading,
    isReplyError,
    isLoading,
    isError,
    limit,
    offset,
    commentById,
    handleGetComment,
    handleGetCommentReplies,
    handleGetCommentById,
  };
};
