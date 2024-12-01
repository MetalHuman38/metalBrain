// ** This file contains comments thread component ** //
import { useGetCommentHandler } from "../../hooks/use-getcomment";
import React, { useEffect, useState } from "react";
import { CommentThreadProps } from "./interface";
import { IComment } from "@/client/services/react-query/comments/interface";
import { RecursiveRender } from "./RecursiveRender";
import { timeAgo } from "@/lib/utils";

export const CommentThread: React.FC<CommentThreadProps> = ({ post_id }) => {
  const {
    recentComment,
    commentReplies,
    limit,
    offset,
    handleGetComment,
    handleGetCommentReplies,
  } = useGetCommentHandler(post_id, 0, 10, 0);
  const [commentWithReplies, setCommentWithReplies] = useState<IComment[]>([]);

  useEffect(() => {
    handleGetComment(post_id);
  }, [post_id, limit, offset]);

  // ** Function to load replies for a given comment recursively ** //
  const loadReplies = async (comment: IComment): Promise<IComment[]> => {
    handleGetCommentReplies(comment.id);
    if (commentReplies && commentReplies.length > 0) {
      const repliesWithNestedReplies = await Promise.all(
        commentReplies.map(async (reply) => {
          const nestedReplies = await loadReplies(reply);
          return { ...reply, replies: nestedReplies };
        })
      );
      return repliesWithNestedReplies;
    }
    return [];
  };

  // ** Function to load top level comments and their nested replies ** //
  useEffect(() => {
    if (recentComment && recentComment.length > 0) {
      const commentsWithReplies = recentComment.map(async (comment) => {
        const replies = await loadReplies(comment);
        return { ...comment, replies };
      });
      Promise.all(commentsWithReplies).then((data) => {
        setCommentWithReplies(data);
      });
    }
  }, [recentComment]);

  const renderComments = (comments: IComment[]) => {
    return comments.map((comment) => (
      <div
        key={comment.id}
        className="border border-gray-200 p-4 rounded-lg my-4"
      >
        <div className="comment-reply text-lg font-semibold">
          {comment.content}
        </div>
        <div>
          {comment.created_at && timeAgo(comment?.created_at.toString())}
        </div>
        <div>{comment.user_id}</div>
        <div>{comment.post_id}</div>
        {comment.replies && renderComments(comment.replies)}
      </div>
    ));
  };

  return (
    <div className="comment-thread">
      <h2>Comments</h2>
      <RecursiveRender
        comments={commentWithReplies}
        parent_comment_id={0}
        post_id={post_id}
        user_id={0}
        loadReplies={loadReplies}
        onReply={() => {}}
      />
    </div>
  );
};

export default CommentThread;
