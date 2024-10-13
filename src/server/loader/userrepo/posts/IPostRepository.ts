import { IPost, IMageStorage } from "./interface";

export interface IPostRepository {
  CreatePost(post: IPost): Promise<IPost>;
  findImageByReferenceKey(
    key: string,
    value: number
  ): Promise<IMageStorage | null>;
}
