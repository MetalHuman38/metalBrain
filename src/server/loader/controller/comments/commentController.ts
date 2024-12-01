// ** This file contains comments controller logic ** //
import { Request, Response } from "express";
import { CommentUseCase } from "../../userrepo/comments/CommentUseCase.js";

// ** Class to handle the logic and behavior of comments controller ** //
export class CommentsController {
  constructor(private commentUseCase: CommentUseCase) { }

  // ** Method to create a new comment ** //
  async createComment(req: Request, res: Response): Promise<void> {
    try {
      const { comment } = req.body;
      console.log("comment from req.body", comment);
      if (!comment) {
        res.status(400).json({ error: "Bad Request" });
        return;
      }
      const newComment = await this.commentUseCase.createComment({
        user_id: comment.user_id,
        post_id: comment.post_id,
        parent_comment_id: comment.parent_comment_id,
        content: comment.content,
        created_at: new Date(),
        updated_at: new Date(),
      });
      console.log("newComment", newComment);
      if (!newComment) {
        res.status(400).json({ error: "Error creating comment in controller" });
        return;
      }
      res
        .status(201)
        .json({ message: "Comment created successfully", newComment });
    } catch (error: any) {
      console.error(
        "Error in createComment controller: ",
        error.message,
        error.stack
      );
      res
        .status(400)
        .json({ error: "Error creating comment in controller catch block" });
    }
  }

  // ** Update Comment ** //
  async updateComment(req: Request, res: Response): Promise<void> {
    try {
      const comment = req.body.comment;
      console.log("comment from req.body", comment);
      if (!comment) {
        res.status(400).json({ error: "Bad Request" });
        return;
      }
      const updatedComment = await this.commentUseCase.updateComment({
        id: comment.id,
        user_id: comment.user_id,
        post_id: comment.post_id,
        parent_comment_id: comment.parent_comment_id,
        content: comment.content,
      });
      console.log("updatedComment", updatedComment);
      if (!updatedComment) {
        res.status(400).json({ error: "Error updating comment in controller" });
        return;
      }
      res.status(200).json({
        message: "Comment updated successfully",
        updatedComment,
      });
    } catch (error: any) {
      console.error(
        "Error in updateComment controller: ",
        error.message,
        error.stack
      );
      res
        .status(400)
        .json({ error: "Error updating comment in controller catch block" });
    }
  }

  // ** Get Comment By ID ** //
  async getCommentById(req: Request, res: Response): Promise<void> {
    console.log("req.params:", req.params);
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        res.status(400).json({ error: "Bad Request" });
        return;
      }
      const comment = await this.commentUseCase.getCommentById(id);
      if (!comment) {
        res.status(404).json({ error: "Error getting comment by ID" });
        return;
      }
      res
        .status(200)
        .json({ message: "Comment retrieved successfully", comment });
    } catch (error: any) {
      console.error(
        "Error in getCommentById controller: ",
        error.message,
        error.stack
      );
      res.status(500).json({
        error: "Error getting comment by ID in controller catch block",
      });
    }
  }

  // ** Get Recent Comments ** //
  async getRecentComments(req: Request, res: Response): Promise<void> {
    try {
      const post_id = parseInt(req.query.post_id as string, 10);
      const limit = parseInt(req.query.limit as string, 10);
      const offset = parseInt(req.query.offset as string, 10);

      // ** Check if the query parameters are valid integers ** //
      if (isNaN(post_id) || isNaN(limit) || isNaN(offset)) {
        res
          .status(400)
          .json({ error: "Bad Request: Invalid query parameters" });
        return;
      }

      const comments = await this.commentUseCase.getRecentComments(
        post_id,
        limit,
        offset
      );

      if (!comments) {
        res.status(404).json({ error: "No recent comments found" });
        return;
      }

      res
        .status(200)
        .json({ message: "Recent comments retrieved successfully", comments });
    } catch (error: any) {
      console.error(
        "Error in getRecentComments controller:",
        error.message,
        error.stack
      );
      res.status(500).json({
        error: "Error getting recent comments in controller catch block",
      });
    }
  }

  // ** Create Reply ** //
  async createReply(req: Request, res: Response): Promise<void> {
    try {
      const { reply } = req.body;
      if (!reply) {
        res.status(400).json({ error: "Bad Request" });
        return;
      }
      const newReply = await this.commentUseCase.createReply({
        user_id: reply.user_id,
        post_id: reply.post_id,
        parent_comment_id: reply.parent_comment_id,
        content: reply.content,
        created_at: new Date(),
        updated_at: new Date(),
      });
      if (!newReply) {
        res.status(400).json({ error: "Error creating reply in controller" });
        return;
      }
      res.status(201).json({ message: "Reply created successfully", newReply });
    } catch (error: any) {
      console.error(
        "Error in createReply controller: ",
        error.message,
        error.stack
      );
      res
        .status(400)
        .json({ error: "Error creating reply in controller catch block" });
    }
  }

  // ** Get comment replies ** //
  async getCommentReplies(req: Request, res: Response): Promise<void> {
    try {
      const parent_comment_id = parseInt(req.params.id, 10);
      const limit = parseInt(req.query.limit as string) || 10; // Default to 10 if not specified
      const offset = parseInt(req.query.offset as string) || 0; // Default to 0 if not specified
      if (isNaN(parent_comment_id) || isNaN(limit) || isNaN(offset)) {
        res.status(400).json({ error: "Bad Request: Invalid comment ID" });
        return;
      }
      const replies = await this.commentUseCase.getCommentReplies(
        parent_comment_id,
        limit,
        offset
      );
      if (!replies || replies.length === 0) {
        res.status(200).json({ message: "No replies found", replies: [] });
        return;
      }
      res
        .status(200)
        .json({ message: "Comment replies retrieved successfully", replies });
    } catch (error: any) {
      console.error(
        "Error in getCommentReplies controller: ",
        error.message,
        error.stack
      );
      res.status(500).json({
        error: "Error getting comment replies in controller catch block",
      });
    }
  }

  // ** Delete Comment ** //
  async deleteComment(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        res.status(400).json({ error: "Bad Request: Invalid comment ID" });
        return;
      }
      await this.commentUseCase.deleteComment(id);

      res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error: any) {
      console.error(
        "Error in deleteComment controller:",
        error.message,
        error.stack
      );
      res
        .status(500)
        .json({ error: "Error deleting comment in controller catch block" });
    }
  }

  // ** Like Comment ** //
  async likeComment(req: Request, res: Response): Promise<void> {
    try {
      const comment_id = parseInt(req.params.comment_id, 10);
      const user_id = parseInt(req.body.user_id, 10);
      if (!comment_id || !user_id) {
        res.status(400).json({ error: "Bad Request" });
        return;
      }
      console.log("id, user_id", comment_id, user_id);
      const likedComment = await this.commentUseCase.likeComment(comment_id, user_id);
      if (!likedComment) {
        res.status(400).json({ error: "Error liking comment in controller" });
        return;
      }
      res.status(200).json({ message: "Comment liked successfully" });
    } catch (error: any) {
      console.error(
        "Error in likeComment controller: ",
        error.message,
        error.stack
      );
      res
        .status(400)
        .json({ error: "Error liking comment in controller catch block" });
    }
  }

  // ** Unlike Comment ** //
  async unLikeComment(req: Request, res: Response): Promise<void> {
    try {
      const comment_id = parseInt(req.params.comment_id, 10);
      const user_id = parseInt(req.body.user_id, 10);
      if (!comment_id || !user_id) {
        res.status(400).json({ error: "Bad Request" });
        return;
      }
      console.log('comment_id, user_id', comment_id, user_id);
      const unlikedComment = await this.commentUseCase.unlikeComment(
        comment_id,
        user_id
      );
      if (!unlikedComment) {
        res.status(400).json({ error: "Error unliking comment in controller" });
        return;
      }
      res.status(200).json({ message: "Comment unliked successfully" });
    } catch (error: any) {
      console.error(
        "Error in unlikeComment controller: ",
        error.message,
        error.stack
      );
      res
        .status(400)
        .json({ error: "Error unliking comment in controller catch block" });
    }
  }

  // ** Get Comment Likes ** //
  async getCommentLikes(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      if (!id) {
        res.status(400).json({ error: "Bad Request" });
        return;
      }
      const likes = await this.commentUseCase.getCommentLikes(id);
      if (!likes) {
        res.status(400).json({ error: "Error getting comment likes" });
        return;
      }
      res
        .status(200)
        .json({ message: "Comment likes retrieved successfully", likes });
    } catch (error: any) {
      console.error(
        "Error in getCommentLikes controller: ",
        error.message,
        error.stack
      );
      res.status(400).json({
        error: "Error getting comment likes in controller catch block",
      });
    }
  }
}
