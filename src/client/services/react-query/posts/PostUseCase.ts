import {
  ILikedPost,
  IPost,
  ISavedPost,
  IUnLikedPost,
  IUnSavedPost,
  IUpdatePost,
} from "./interface";
import { IPostRepository } from "./IPostRepository";

export class PostUseCase {
  constructor(private postRepository: IPostRepository) {}
  async createPost(post: IPost, token: string): Promise<IPost> {
    return this.postRepository.createPost(post, token);
  }

  async updatePost(post: IUpdatePost): Promise<any> {
    return this.postRepository.updatePost(post);
  }

  async getPostById(id: number): Promise<IPost> {
    return this.postRepository.getPostById(id);
  }

  async getRecentPost(limit: number, offset: number): Promise<IPost[]> {
    return this.postRepository.getRecentPost(limit, offset);
  }

  async savePost(post: ISavedPost): Promise<ISavedPost> {
    return this.postRepository.SavePost(post);
  }

  async unSavePost(post: IUnSavedPost): Promise<any> {
    return this.postRepository.UnSavePost(post);
  }

  async getAllSavedPosts(post: ISavedPost[]): Promise<ISavedPost[]> {
    return this.postRepository.GetAllSavedPosts(post);
  }

  async likePost(post: ILikedPost): Promise<ILikedPost> {
    return this.postRepository.LikePost(post);
  }

  async unLikePost(post: IUnLikedPost): Promise<any> {
    return this.postRepository.UnLikePost(post);
  }
}

export default PostUseCase;
