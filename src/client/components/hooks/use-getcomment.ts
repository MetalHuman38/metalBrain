// ** This file contains the useGetComment and comment replies hooks ** //
import { useCallback, useState } from "react";
import { useGetRecentComments } from "@/client/services/react-query/comments/CommentQueryMutation";
import { useGetCommentReplies } from "@/client/services/react-query/comments/CommentQueryMutation";
import { useGetCommentById } from "@/client/services/react-query/comments/CommentQueryMutation";

// ** Set up get comment hook ** //
export const useGetCommentHandler = () => {
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [post_id, setPostId] = useState<number>(0);
  const [parent_comment_id, setParentCommentId] = useState<number>(0);
  const [comment_id, setCommentId] = useState<number>(0);

  // Fetch the recent comment based on comment_id
  const {
    data: recentComment,
    isLoading,
    isError,
  } = useGetRecentComments(post_id, limit, offset);

  const {
    data: commentReplies,
    isLoading: isReplyLoading,
    isError: isReplyError,
  } = useGetCommentReplies(parent_comment_id, limit, offset);

  const { data: commentById } = useGetCommentById(parent_comment_id);

  // ** Handle fetching a comment ** //
  const handleGetComment = useCallback((post_id: number, limit: number, offset: number) => {
    setLimit(limit);
    setOffset(offset);
    setPostId(post_id);
  }, []);

  // ** Get comment replies ** //
  const handleGetCommentReplies = useCallback((parent_comment_id: number, limit: number, offset: number) => {
    setLimit(limit);
    setOffset(offset);
    setParentCommentId(parent_comment_id);
  }, []);

  // ** Get comment by id ** //
  const handleGetCommentById = useCallback((comment_id: number) => {
    setCommentId(comment_id);
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
    comment_id,
    handleGetComment,
    handleGetCommentReplies,
    handleGetCommentById,
  };
};
