import { ICommentRepository } from "./ICommentRepository";
import { IComment, ICreateComment, IUpdateComment } from "./interface";

export class CommentUseCase {
  private commentRepo: ICommentRepository;

  constructor(commentRepo: ICommentRepository) {
    this.commentRepo = commentRepo;
  }

  async createComment(comment: ICreateComment): Promise<IComment> {
    return this.commentRepo.createComment(comment);
  }

  async updateComment(comment: IUpdateComment): Promise<IComment> {
    console.log("Comment data in use case:", comment);
    return this.commentRepo.updateComment(comment);
  }

  async getCommentById(id: number): Promise<IComment> {
    console.log("Comment id in use case:", id);
    return this.commentRepo.getCommentById(id);
  }

  async getRecentComments(
    post_id: number,
    limit: number,
    offset: number
  ): Promise<IComment[]> {
    return this.commentRepo.getRecentComments(post_id, limit, offset);
  }

  async createReply(reply: ICreateComment): Promise<IComment> {
    return this.commentRepo.createReply(reply);
  }

  async getCommentReplies(
    parent_comment_id: number,
    limit: number,
    offset: number
  ): Promise<IComment[]> {
    return this.commentRepo.getCommentReplies(parent_comment_id, limit, offset);
  }

  async deleteComment(id: number): Promise<void> {
    return this.commentRepo.deleteComment(id);
  }

  async likeComment(comment_id: number, user_id: number): Promise<IComment> {
    return this.commentRepo.likeComment(comment_id, user_id);
  }

  async unlikeComment(comment_id: number, user_id: number): Promise<IComment> {
    return this.commentRepo.unlikeComment(comment_id, user_id);
  }

  async getCommentLikes(id: number): Promise<number[]> {
    return this.commentRepo.getCommentLikes(id);
  }
}
