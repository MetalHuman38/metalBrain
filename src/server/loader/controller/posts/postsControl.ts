import { Request, Response } from "express";
import { PostUseCase } from "../../userrepo/posts/PostUseCase";

// ** Class to handle the logic and behavior of posts controller ** //
export class PostsController {
  constructor(private postUseCase: PostUseCase) { }
  // ** Method to create a new post ** //
  async createPost(req: Request, res: Response): Promise<void> {
    try {
      const { post } = req.body;
      const token = req.cookies.token;
      if (!token) {
        res.status(400).json({ error: "Token not found" });
        return;
      }
      if (!post) {
        res.status(400).json({ error: "Bad Request" });
        return;
      }
      const newPost = await this.postUseCase.createPost(
        {
          id: post.id,
          caption: post.caption,
          imageUrl: post.imageUrl,
          location: post.location,
          tags: post.tags,
          likes_count: post.likes_count,
          comment_count: post.comment_count,
          creator_id: post.creator_id,
          created_at: new Date(),
          updated_at: new Date(),
        },
        token as string
      );
      console.log("newPost", newPost);
      if (!newPost) {
        res.status(400).json({ error: "Error creating post in controller" });
        return;
      }
      res.status(201).json({ message: "Post created successfully", newPost });
    } catch (error: any) {
      console.error(
        "Error in createPost controller: ",
        error.message,
        error.stack
      );
      res
        .status(400)
        .json({ error: "Error creating post in controller catch block" });
    }
  }

  // ** Update Post ** //
  async updatePost(req: Request, res: Response): Promise<void> {
    try {
      const post = req.body;
      console.log("post from req.body", post);
      console.log("post from backend", post);
      if (!post) {
        res.status(400).json({ error: "Bad Request" });
        return;
      }
      const updatedPost = await this.postUseCase.updatePost(post);
      if (!updatedPost) {
        res.status(400).json({ error: "Error updating post in controller" });
        return;
      }
      res.status(200).json({
        message: "Post updated successfully",
        updatedPost,
      });
    } catch (error: any) {
      console.error(
        "Error in updatePost controller: ",
        error.message,
        error.stack
      );
      res
        .status(400)
        .json({ error: "Error updating post in controller catch block" });
    }
  }

  // ** Get Post By ID ** //
  async getPostById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.query.id as string, 10);
      if (!id) {
        res.status(400).json({ error: "Bad Request" });
        return;
      }
      const post = await this.postUseCase.getPostById(Number(id));
      if (!post) {
        res.status(400).json({ error: "Post not found" });
        return;
      }
      res.status(200).json({ message: "Post found", post });
    } catch (error: any) {
      console.error(
        "Error in getPostById controller: ",
        error.message,
        error.stack
      );
      res
        .status(400)
        .json({ error: "Error getting post in controller catch block" });
    }
  }

  // ** Get recent Post ** //
  async getRecentPost(req: Request, res: Response): Promise<any> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const offset = (page - 1) * limit; // Calculate offset

      const post = await this.postUseCase.getRecentPost(limit, offset);
      if (!post || post.length === 0) {
        return [];
      }
      res.status(200).json({
        post,
      });
    } catch (error: any) {
      console.error(
        "Error in getRecentPost controller: ",
        error.message,
        error.stack
      );
      res.status(500).json({ error: "Error fetching recent posts" });
    }
  }

  // ** Save Post ** //
  async savePost(req: Request, res: Response): Promise<void> {
    try {
      const post = req.body;
      if (!post) {
        res.status(400).json({ error: "Bad Request" });
        return;
      }
      const newPost = await this.postUseCase.savePost(post);
      if (!newPost) {
        res.status(400).json({ error: "Error saving post in controller" });
        return;
      }
      res.status(201).json({ message: "Post saved successfully", newPost });
    } catch (error: any) {
      console.error(
        "Error in savePost controller: ",
        error.message,
        error.stack
      );
      res
        .status(400)
        .json({ error: "Error saving post in controller catch block" });
    }
  }

  // ** UnSave Post ** //
  async unSavePost(req: Request, res: Response): Promise<void> {
    try {
      const post = req.body;
      if (!post) {
        res.status(400).json({ error: "Bad Request" });
        return;
      }
      await this.postUseCase.unSavePost(post);
      res.status(200).json({ message: "Post unsaved successfully" });
    } catch (error: any) {
      console.error(
        "Error in unSavePost controller: ",
        error.message,
        error.stack
      );
      res
        .status(400)
        .json({ error: "Error unsaving post in controller catch block" });
    }
  }

  // ** Get All Saved Posts ** //
  async getAllSavedPosts(req: Request, res: Response): Promise<void> {
    try {
      const post = req.body;
      if (!post) {
        res.status(400).json({ error: "Bad Request" });
        return;
      }
      const savedPosts = await this.postUseCase.getAllSavedPosts(post);
      if (!savedPosts) {
        res
          .status(400)
          .json({ error: "Error getting saved posts in controller" });
        return;
      }
      res.status(200).json({ message: "Saved posts found", savedPosts });
    } catch (error: any) {
      console.error(
        "Error in getAllSavedPosts controller: ",
        error.message,
        error.stack
      );
      res
        .status(400)
        .json({ error: "Error getting saved posts in controller catch block" });
    }
  }

  // ** Like Post ** //
  async likePost(req: Request, res: Response): Promise<void> {
    try {
      const post = req.body;
      if (!post) {
        res.status(400).json({ error: "Bad Request" });
        return;
      }
      console.log("post from req.body", post);
      const newPost = await this.postUseCase.likePost(post);
      if (!newPost) {
        res.status(400).json({ error: "Error liking post in controller" });
        return;
      }
      res.status(201).json({ message: "Post liked successfully", newPost });
    } catch (error: any) {
      console.error(
        "Error in likePost controller: ",
        error.message,
        error.stack
      );
      res
        .status(400)
        .json({ error: "Error liking post in controller catch block" });
    }
  }

  // ** Unlike Post ** //
  async unLikePost(req: Request, res: Response): Promise<void> {
    try {
      const post = req.body;
      if (!post) {
        res.status(400).json({ error: "Bad Request" });
        return;
      }
      console.log("post from req.body", post);
      await this.postUseCase.unLikePost(post);
      res.status(200).json({ message: "Post unliked successfully" });
    } catch (error: any) {
      console.error(
        "Error in unLikePost controller: ",
        error.message,
        error.stack
      );
      res
        .status(400)
        .json({ error: "Error unliking post in controller catch block" });
    }
  }
}

export default {
  PostsController,
};
