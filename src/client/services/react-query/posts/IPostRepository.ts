import { IPost } from "./interface";

export interface IPostRepository {
  createPost(post: IPost): Promise<IPost>;
}
