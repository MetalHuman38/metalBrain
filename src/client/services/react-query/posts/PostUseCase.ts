import { IPost, IUpdatePost } from "./interface";
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
}

export default PostUseCase;
