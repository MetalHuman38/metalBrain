import { IPost, IUpdatePost } from "./interface";

export interface IPostRepository {
  createPost(post: IPost, token: string): Promise<any>;
  updatePost(post: IUpdatePost): Promise<any>;
  getPostById(id: number): Promise<any>;
  getRecentPost(limit: number, offset: number): Promise<IPost[]>;
}

export default IPostRepository;
