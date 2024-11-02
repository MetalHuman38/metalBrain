import { IPost, IMageStorage, IUpdatePost } from "./interface";

export interface IPostRepository {
  CreatePost(post: IPost): Promise<IPost>;
  findImageByReferenceKey(
    key: string,
    value: number
  ): Promise<IMageStorage | null>;
  UpdatePost(post: IUpdatePost): Promise<any>;
  GetPostById(id: number): Promise<IPost | null>;
  GetRecentPost(limit: number, offset: number): Promise<IPost[]>;
}
