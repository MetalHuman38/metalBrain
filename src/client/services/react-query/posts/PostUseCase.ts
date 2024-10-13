import { IPost } from "./interface";
import { IPostRepository } from "./IPostRepository";

export class PostUseCase {
  constructor(private postRepository: IPostRepository) {}
  async createPost(post: IPost): Promise<IPost> {
    return this.postRepository.createPost(post);
  }
}
