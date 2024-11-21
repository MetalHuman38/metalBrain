import React, { useEffect, useState } from "react";
import { useCreateCommentHandler } from "@/client/components/hooks/use-comments";
import {
  IComment,
  ICreateComment,
} from "@/client/services/react-query/comments/interface";
import { CommentModalProps } from "./interface";
import { useGetCommentHandler } from "../../hooks/use-getcomment";
import { timeAgo } from "@/lib/utils";
import { RecursiveRender } from "./RecursiveRender";

// ** Comment Modal Component ** //
const CommentModal: React.FC<CommentModalProps> = ({
  post_id,
  user_id,
  isOpen,
  onClose,
}) => {
  const { handleCommentCreation } = useCreateCommentHandler();
  const [commentText, setCommentText] = useState<string>("");
  const {
    recentComment,
    commentReplies,
    limit,
    offset,
    handleGetCommentReplies,
  } = useGetCommentHandler();
  const [commentWithReplies, setCommentWithReplies] = useState<IComment[]>([]);

  const handleCreateComment = async () => {
    const newComment: ICreateComment = {
      post_id: post_id,
      user_id: user_id,
      content: commentText,
    };
    await handleCommentCreation(newComment);
    onClose();
  };

  if (!isOpen) return null;

  // ** Function to load replies for a given comment recursively ** //
  const loadReplies = async (comment: IComment): Promise<IComment[]> => {
    handleGetCommentReplies(comment.id, limit, offset);
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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-dark-3 p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-lg items-center font-semibold mb-4">Comments</h2>
        <div className="comment-thread">
          {commentWithReplies.length > 0 ? (
            renderComments(commentWithReplies)
          ) : (
            <div>
              <RecursiveRender
                post_id={post_id}
                user_id={user_id}
                parent_comment_id={0}
                comments={commentWithReplies}
                onReply={() => {}}
                loadReplies={loadReplies}
              />
            </div>
          )}
        </div>
        <h3 className="text-lg font-semibold mt-4">Add a comment</h3>
        <textarea
          className="w-full border rounded-lg p-2 mb-4 shad-textarea custom-scrollbar resize-none"
          placeholder="Type your comment here..."
          value={commentText}
          id="comment"
          onChange={(e) => setCommentText(e.target.value)}
          rows={4}
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-rose-800 rounded-md hover:bg-rose-900"
          >
            Cancel
          </button>
          <button
            onClick={handleCreateComment}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
