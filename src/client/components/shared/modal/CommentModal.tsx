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
import Loader from "../Loader";
import { useUserContext } from "@/client/services/context/user/UseContext";

// ** Comment Modal Component ** //
const CommentModal: React.FC<CommentModalProps> = ({
  post_id,
  user_id,
  isOpen,
  onClose,
}) => {
  const { handleCommentCreation, handleCommentLike, handleCommentUnlike } =
    useCreateCommentHandler();
  const [commentText, setCommentText] = useState<string>("");
  const [limit, _setLimit] = useState<number>(10);
  const [offset, _setOffset] = useState<number>(0);
  const { recentComment, commentReplies, handleGetCommentReplies } =
    useGetCommentHandler(post_id, user_id, limit, offset);
  const [commentWithReplies, setCommentWithReplies] = useState<IComment[]>([]);
  const [isLiked, _setIsLiked] = useState(false);
  const [isLikingComment, _setIsLikingComment] = useState(false);
  const { user } = useUserContext();

  const handleCreateComment = async () => {
    const newComment: ICreateComment = {
      post_id: post_id,
      user_id: Number(user?.id) || user_id,
      content: commentText,
    };
    await handleCommentCreation(newComment);
    onClose();
  };

  if (!isOpen) return null;

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
        className="shadow-md border border-gray-300 p-4 rounded-lg my-4"
      >
        {/* ** user info ** */}
        <div className="flex items-center gap-2">
          <img
            className="w-8 h-8 rounded-full"
            src={
              comment?.user?.avatarUrl
                ? `${comment?.user?.avatarUrl}`
                : "/assets/icons/profile-placeholder.svg"
            }
            alt="user"
          />
          <div className="font-semibold text-sm text-blue-600">
            {comment?.user?.username || "Anonymous"} {/* Access username */}
          </div>
          <div className="font-semibold text-sm text-gray-600">
            {comment.created_at && timeAgo(comment?.created_at.toString())}
          </div>
        </div>
        <div className="flex items-center">
          <div className="comment-reply text-sm font-semibold">
            {comment.content}
          </div>
          <div className="flex gap-2">
            {isLikingComment ? (
              <Loader />
            ) : (
              <img
                src={
                  isLiked ? "/assets/icons/liked.svg" : "/assets/icons/like.svg"
                }
                alt="like"
                className="ml-4 cursor-pointer"
                loading="lazy"
                width={16}
                height={16}
                onClick={() => {
                  comment.isLiked
                    ? handleCommentUnlike(comment.id, Number(user?.id))
                    : handleCommentLike(comment.id, Number(user?.id));
                }}
              />
            )}
            <p className="small-medium lg:base-medium">{comment.like_count}</p>
          </div>
        </div>
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
