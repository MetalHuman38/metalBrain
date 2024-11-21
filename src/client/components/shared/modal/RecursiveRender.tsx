import { useState } from "react";
import { IComment } from "@/client/services/react-query/comments/interface";
import { useCreateCommentHandler } from "../../hooks/use-comments";
import { RecursiveRenderCommentsProps } from "./interface";
import { timeAgo } from "@/lib/utils";

export const RecursiveRender = ({
  comments,
  post_id,
  user_id,
  onReply,
  loadReplies,
}: RecursiveRenderCommentsProps) => {
  const [replyContent, setReplyContent] = useState<string>("");
  const [focusedComment, setFocusedComment] = useState<IComment | null>(null);
  const { handleCommentCreation } = useCreateCommentHandler();

  const handleReply = async (comment: IComment) => {
    const newComment = {
      user_id,
      post_id,
      parent_comment_id: comment.id,
      content: replyContent,
    };
    await handleCommentCreation(newComment);
    setReplyContent("");
    loadReplies(comment);
  };

  return (
    <div>
      {comments.map((comment) => (
        <div key={comment.id}>
          <div>{comment.content}</div>
          <div>
            {comment.created_at && timeAgo(comment.created_at.toString())}
          </div>
          <div>{comment.user_id}</div>
          <div>{comment.post_id}</div>
          <button onClick={() => handleReply(comment)}>Reply</button>
          {comment.replies && (
            <RecursiveRender
              comments={comment.replies}
              parent_comment_id={comment.id}
              post_id={post_id}
              user_id={user_id}
              onReply={onReply}
              loadReplies={loadReplies}
            />
          )}
          <div>
            {focusedComment?.id === comment.id ? (
              <div>
                <textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  onFocus={() => setFocusedComment(comment)}
                  className="w-full border rounded-lg p-2 mb-4 shad-textarea custom-scrollbar resize-none"
                />
                <button
                  onClick={() => handleReply(comment)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Submit
                </button>
              </div>
            ) : (
              <button
                onClick={() => setFocusedComment(comment)}
                className="px-4 py-2 bg-rose-800 rounded-md hover:bg-rose-900"
              >
                Reply
              </button>
            )}
          </div>
          <button onClick={() => onReply(comment)}>Reply</button>
        </div>
      ))}
    </div>
  );
};
