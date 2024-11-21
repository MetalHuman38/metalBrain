import {
  IPost,
  IMageStorage,
  IUpdatePost,
  ISavedPost,
  ILikedPost,
  IUnSavedPost,
  IUnLikedPost,
} from "./interface";

export interface IPostRepository {
  CreatePost(post: IPost): Promise<IPost>;
  findImageByReferenceKey(
    key: string,
    value: number
  ): Promise<IMageStorage | null>;
  UpdatePost(post: IUpdatePost): Promise<any>;
  GetPostById(id: number): Promise<IPost | null>;
  GetRecentPost(limit: number, offset: number): Promise<IPost[]>;
  SavePost(post: ISavedPost): Promise<ISavedPost>;
  UnSavePost(post: IUnSavedPost): Promise<null>;
  LikePost(post: ILikedPost): Promise<ILikedPost>;
  UnLikePost(post: IUnLikedPost): Promise<null>;
  GetAllSavedPosts(post: ISavedPost): Promise<ISavedPost[]>;
}
