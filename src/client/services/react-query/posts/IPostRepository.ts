import {
  ILikedPost,
  IPost,
  ISavedPost,
  IUnLikedPost,
  IUnSavedPost,
  IUpdatePost,
} from "./interface";

export interface IPostRepository {
  createPost(post: IPost, token: string): Promise<any>;
  updatePost(post: IUpdatePost): Promise<any>;
  getPostById(id: number): Promise<any>;
  getRecentPost(limit: number, offset: number): Promise<IPost[]>;
  SavePost(post: ISavedPost): Promise<ISavedPost>;
  UnSavePost(post: IUnSavedPost): Promise<null>;
  LikePost(post: ILikedPost): Promise<ILikedPost>;
  UnLikePost(post: IUnLikedPost): Promise<null>;
  GetAllSavedPosts(post: ISavedPost[]): Promise<ISavedPost[]>;
}

export default IPostRepository;
