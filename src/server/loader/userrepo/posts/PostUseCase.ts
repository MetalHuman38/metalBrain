import { IPostRepository } from "./IPostRepository";
import { IPost, IUpdatePost } from "./interface";
import { VerifyUserUseCase } from "../userUseCases";

// ** Post Use Case ** //
export class PostUseCase {
  constructor(
    private postRepository: IPostRepository,
    private verifyUserUseCase: VerifyUserUseCase // Use VerifyUserUseCase
  ) {}

  async createPost(post: IPost, token: string): Promise<any> {
    try {
      // ** Verify User ** //
      const user = await this.verifyUserUseCase.VerifyUser(token);

      if (user.id === undefined) {
        throw new Error("User ID is undefined");
      }
      const image = await this.postRepository.findImageByReferenceKey(
        "creator_id",
        user.id
      );
      if (!image) {
        throw new Error("Image not found");
      }
      const newPost = await this.postRepository.CreatePost({
        id: post.id,
        imageUrl: post.imageUrl || image.imageUrl,
        caption: post.caption,
        location: post.location,
        tags: post.tags,
        likes_count: post.likes_count,
        creator_id: user.id,
        created_at: post.created_at,
        updated_at: post.updated_at,
      });
      console.log("newPost", newPost);
      if (!newPost) {
        throw new Error("Error creating post in NewPost");
      }
      return newPost;
    } catch (error) {
      console.error("Error creating post in Catch block", error);
      throw error;
    }
  }

  // ** Update Post ** //
  async updatePost(post: IUpdatePost): Promise<any> {
    try {
      const updatedPost = await this.postRepository.UpdatePost(post);
      if (!updatedPost) {
        throw new Error("Error updating post in UpdatePost");
      }
      return updatedPost;
    } catch (error) {
      console.error("Error updating post in Catch block", error);
      throw error;
    }
  }

  // ** Get Post By ID ** //
  async getPostById(id: number): Promise<IPost | null> {
    try {
      const post = await this.postRepository.GetPostById(id);
      if (!post) {
        throw new Error("Post not found");
      }
      return post;
    } catch (error) {
      console.error("Error getting post by id in use case Catch block", error);
      throw error;
    }
  }

  // ** Get recent Post ** //
  async getRecentPost(limit: number, offset: number): Promise<IPost[]> {
    try {
      const post = await this.postRepository.GetRecentPost(limit, offset);
      if (!post) {
        throw new Error("Post not found");
      }
      return post;
    } catch (error) {
      console.error("Error getting recent post in Catch block", error);
      throw error;
    }
  }
}

export default {
  PostUseCase,
};
