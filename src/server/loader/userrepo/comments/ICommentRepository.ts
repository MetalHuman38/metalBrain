import { IComment, ICreateComment, IUpdateComment } from "./interface";

export interface ICommentRepository {
  createComment(comment: ICreateComment): Promise<IComment>;
  createReply(reply: ICreateComment): Promise<IComment>;
  updateComment(comment: IUpdateComment): Promise<IComment>;
  getCommentById(id: number): Promise<IComment>;
  getRecentComments(
    post_id: number,
    limit: number,
    offset: number
  ): Promise<IComment[]>;
  deleteComment(id: number): Promise<void>;
  likeComment(id: number, user_id: number): Promise<IComment>;
  unlikeComment(id: number, user_id: number): Promise<IComment>;
  getCommentLikes(id: number): Promise<number[]>;
  getCommentReplies(
    parent_comment_id: number,
    limit: number,
    offset: number
  ): Promise<IComment[]>;
}
