// ** This file contains the sequelize implementation of the CommentRepo interface ** //
import { IComment, IUpdateComment } from "./interface";
import { ICommentRepository } from "./ICommentRepository";
import comments from "../../sequelize/models/comments/comments.model.js";
import liked_comments from "../../sequelize/models/comments/liked_comment.js";
import posts from "../../sequelize/models/posts/posts.model.js";
import users from "../../sequelize/models/usermodels/users.model.js";

export class SequelizeComRepo implements ICommentRepository {
  async createComment(comment: IComment): Promise<IComment> {
    const transaction = await comments.sequelize?.transaction();
    const newComment = await comments.create(comment);
    await posts.increment("comment_count", { where: { id: comment.post_id } });
    transaction?.commit();
    return newComment.toJSON() as IComment;
  }

  async updateComment(comment: IUpdateComment): Promise<IComment> {
    try {
      const affectedCount = await comments.update(
        {
          content: comment.content,
          is_edited: true,
          edited_at: new Date(),
        },
        {
          where: {
            id: comment.id,
          },
        }
      );
      if (!affectedCount) {
        throw new Error("Comment not found");
      }
      const updatedComment = await comments.findByPk(comment.id);
      if (!updatedComment) {
        throw new Error("Comment not found");
      }
      return updatedComment.toJSON() as IComment;
    } catch (error) {
      throw error;
    }
  }

  async getCommentById(id: number): Promise<IComment> {
    const comment = await comments.findByPk(id);
    if (!comment) {
      return {} as IComment;
    }
    console.log(`Comment retrieved: ${comment.toJSON()}`);
    return comment.toJSON() as IComment;
  }

  async getRecentComments(
    post_id: number,
    limit: number,
    offset: number
  ): Promise<IComment[]> {
    const recentComments = await comments.findAll({
      where: { post_id: post_id, parent_comment_id: null },
      limit,
      offset,
      order: [["created_at", "DESC"]],
      include: [
        {
          model: users,
          attributes: ['username', 'avatarUrl'], // Fetch only the username
        },
      ],
    });
    return recentComments.map((comment) => comment.toJSON() as IComment);
  }

  async createReply(reply: IComment): Promise<IComment> {
    const transaction = await comments.sequelize?.transaction();
    const newReply = await comments.create(reply, { transaction });
    transaction?.commit();
    return newReply.toJSON() as IComment;
  }

  async getCommentReplies(
    parent_comment_id: number,
    limit: number,
    offset: number
  ): Promise<IComment[]> {
    const replies = await comments.findAll({
      where: { parent_comment_id: parent_comment_id },
      limit,
      offset,
    });
    if (!replies) {
      return [];
    }
    return replies.map((reply) => reply.toJSON() as IComment);
  }

  async deleteComment(id: number): Promise<void> {
    const comment = await comments.findByPk(id);
    if (!comment) {
      throw new Error("Comment not found");
    }
    await posts.decrement("comment_count", { where: { id: comment.post_id } });
    await comment.destroy();
  }

  async likeComment(id: number, user_id: number): Promise<IComment> {
    const transaction = await comments.sequelize?.transaction();
    const existinglike = await liked_comments.findOne({
      where: { comment_id: id, user_id },
      transaction,
    });
    if (existinglike) {
      throw new Error("Comment already liked");
    }
    const newLike = await liked_comments.create({
      comment_id: id,
      user_id: user_id,
      created_at: new Date(),
    });
    if (!newLike) {
      throw new Error("Failed to like comment");
    }
    await comments.increment("like_count", {
      where: { id },
    });

    const likedComment = await comments.findByPk(id);
    if (!likedComment) {
      throw new Error("Comment not found");
    }
    return likedComment.toJSON() as IComment;
  }

  async unlikeComment(id: number, user_id: number): Promise<IComment> {
    const transaction = await comments.sequelize?.transaction();
    const existinglike = await liked_comments.findOne({
      where: { comment_id: id, user_id },
      transaction,
    });
    if (!existinglike) {
      throw new Error("Comment not liked");
    }
    await existinglike.destroy();
    await comments.decrement("like_count", {
      where: { id },
    });
    const unlikedComment = await comments.findByPk(id);
    if (!unlikedComment) {
      throw new Error("Comment not found");
    }
    return unlikedComment.toJSON() as IComment;
  }

  async getCommentLikes(id: number): Promise<number[]> {
    const comment = await comments.findByPk(id);
    if (!comment) {
      throw new Error("Comment not found");
    }
    return [comment.like_count ?? 0];
  }
}

export default SequelizeComRepo;
