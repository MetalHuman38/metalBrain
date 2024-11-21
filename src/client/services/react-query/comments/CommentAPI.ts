// ** This file contains comments related API calls ** //
import { AxiosConfig } from "../../../axios/AxiosConfig";
import { ICommentRepository } from "./ICommentRepository";
import { IComment, ICreateComment, IUpdateComment } from "./interface";

export class CommentAPI implements ICommentRepository {
  async createComment(comment: ICreateComment): Promise<IComment> {
    try {
      const response = await AxiosConfig.post(
        "/create-comment",
        {
          comment,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data.comment as IComment;
    } catch (error) {
      throw error;
    }
  }

  async createReply(reply: ICreateComment): Promise<IComment> {
    try {
      const response = await AxiosConfig.post(
        "/create-reply",
        {
          reply,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data.reply as IComment;
    } catch (error) {
      throw error;
    }
  }

  async updateComment(comment: IUpdateComment): Promise<IComment> {
    try {
      const response = await AxiosConfig.put(
        "/update-comment",
        {
          comment,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data.updatedComment as IComment;
    } catch (error) {
      throw error;
    }
  }

  async getCommentById(id: number): Promise<IComment> {
    try {
      const response = await AxiosConfig.get(`/get-comment/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data.comment as IComment;
    } catch (error) {
      throw error;
    }
  }

  async getRecentComments(
    post_id: number,
    limit: number,
    offset: number
  ): Promise<IComment[]> {
    try {
      const response = await AxiosConfig.get("/get-recent-comments", {
        params: {
          post_id,
          limit,
          offset,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data.comments as IComment[];
    } catch (error) {
      throw error;
    }
  }

  async deleteComment(id: number): Promise<void> {
    try {
      await AxiosConfig.delete(`/delete-comment/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async likeComment(id: number, user_id: number): Promise<IComment> {
    try {
      const response = await AxiosConfig.post(
        `/like-comment/${id}`,
        {
          user_id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data.likedComment as IComment;
    } catch (error) {
      throw error;
    }
  }

  async unlikeComment(id: number, user_id: number): Promise<IComment> {
    try {
      const response = await AxiosConfig.post(
        `/unlike-comment/${id}`,
        {
          user_id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data.unlikedComment as IComment;
    } catch (error) {
      throw error;
    }
  }

  async getCommentLikes(id: number): Promise<number[]> {
    try {
      const response = await AxiosConfig.get(`/get-comment-likes/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data.likes as number[];
    } catch (error) {
      throw error;
    }
  }

  async getCommentReplies(
    parent_comment_id: number,
    limit: number,
    offset: number
  ): Promise<IComment[]> {
    try {
      const response = await AxiosConfig.get(`/get-replies/${parent_comment_id}/reply`, {
        params: {
          parent_comment_id,
          limit,
          offset,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data.replies as IComment[];
    } catch (error) {
      throw error;
    }
  }
}
