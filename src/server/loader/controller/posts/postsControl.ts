import { Request, Response } from "express";
import { PostUseCase } from "../../userrepo/posts/PostUseCase";

// ** Class to handle the logic and behavior of posts controller ** //
export class PostsController {
  constructor(private postUseCase: PostUseCase) {}
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
      const page = parseInt(req.query.page as string) || 1; // Default to page 1
      const limit = parseInt(req.query.limit as string) || 10; // Default to 10 posts per page
      const offset = (page - 1) * limit; // Calculate offset

      const post = await this.postUseCase.getRecentPost(limit, offset);
      if (!post || post.length === 0) {
        res.status(404).json({ error: "No recent posts found" });
        return post;
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
}

export default {
  PostsController,
};
