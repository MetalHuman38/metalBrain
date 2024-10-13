import { Request, Response } from "express";
import { PostUseCase } from "../../userrepo/posts/PostUseCase";

// ** Class to handle the logic and behavior of posts controller ** //
export class PostsController {
  constructor(private postUseCase: PostUseCase) {}
  // ** Method to create a new post ** //
  async createPost(req: Request, res: Response): Promise<void> {
    try {
      const { post, token } = req.body;
      if (!post || !token) {
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
        token
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
}

export default {
  PostsController,
};
