import { IComment, ICreateComment } from "@/client/services/react-query/comments/interface";

// ** This file contains CommentModal Props ** //
export interface CommentModalProps {
  post_id: number;
  user_id: number;
  isOpen: boolean;
  onClose: () => void;
}

export interface CommentThreadProps {
  post_id: number;
}

export interface RecursiveRenderCommentsProps {
  comments: IComment[];
  parent_comment_id: number;
  post_id: number;
  user_id: number;
  onReply: (comment: ICreateComment) => void;
  loadReplies: (comment: IComment) => void;
}