import { IPostRepository } from "./IPostRepository";
import { IJwtHandler } from "../../../services/jwtHandler.js";
import { IPost } from "./interface";
import IUserRepository from "../IUserRepository";

// ** Post Use Case ** //
export class PostUseCase {
  constructor(
    private postRepository: IPostRepository,
    private userRepository: IUserRepository,
    private jwtHandler: IJwtHandler
  ) {}

  async createPost(post: IPost, token: string): Promise<any> {
    try {
      const decodedToken = this.jwtHandler.jwtVerifier(token);
      if (!decodedToken) {
        throw new Error("Invalid token");
      }

      console.log("decodedToken", decodedToken);

      const user_id = decodedToken.id;
      if (!user_id) {
        throw new Error("Invalid user id");
      }
      console.log("user_id", user_id);
      const user = await this.userRepository.findUsersById(user_id);
      if (!user) {
        throw new Error("User not found");
      }

      console.log("user", user);
      // ** Retrieve image from image storage ** //
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
        imageUrl: image.imageUrl,
        caption: post.caption,
        location: post.location,
        tags: post.tags,
        likes_count: post.likes_count,
        creator_id: post.creator_id,
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
}

export default {
  PostUseCase,
};
