import { IPostRepository } from "./IPostRepository";
import {
  ILikedPost,
  IPost,
  ISavedPost,
  IUnLikedPost,
  IUnSavedPost,
  IUpdatePost,
} from "./interface";
import { VerifyUserUseCase } from "../userUseCases";

// ** Post Use Case ** //
export class PostUseCase {
  constructor(
    private postRepository: IPostRepository,
    private verifyUserUseCase: VerifyUserUseCase // Use VerifyUserUseCase
  ) { }

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
        comment_count: post.comment_count,
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

  // ** Save Post ** //
  async savePost(post: ISavedPost): Promise<ISavedPost> {
    try {
      const newPost = await this.postRepository.SavePost(post);
      if (!newPost) {
        throw new Error("Error saving post in SavePost");
      }
      return newPost;
    } catch (error) {
      console.error("Error saving post in Catch block", error);
      throw error;
    }
  }

  // ** UnSave Post ** //
  async unSavePost(post: IUnSavedPost): Promise<null> {
    try {
      await this.postRepository.UnSavePost(post);
      return null;
    } catch (error) {
      console.error("Error unsaving post in Catch block use case", error);
      throw error;
    }
  }

  // ** Get All Saved Posts ** //
  async getAllSavedPosts(post: ISavedPost): Promise<ISavedPost[]> {
    try {
      const savedPosts = await this.postRepository.GetAllSavedPosts(post);
      if (!savedPosts) {
        throw new Error("Error getting saved posts in GetAllSavedPosts");
      }
      return savedPosts;
    } catch (error) {
      console.error("Error getting saved posts in Catch block", error);
      throw error;
    }
  }

  // ** Like Post ** //
  async likePost(post: ILikedPost): Promise<ILikedPost> {
    try {
      const newPost = await this.postRepository.LikePost(post);
      if (!newPost) {
        throw new Error("Error liking post in LikePost");
      }
      return newPost;
    } catch (error) {
      console.error("Error liking post in Catch block", error);
      throw error;
    }
  }

  // ** Unlike Post ** //
  async unLikePost(post: IUnLikedPost): Promise<null> {
    try {
      await this.postRepository.UnLikePost(post);
      return null;
    } catch (error) {
      console.error("Error unliking post in Catch block", error);
      throw error;
    }
  }
}

export default {
  PostUseCase,
};
