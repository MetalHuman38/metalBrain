import { IUser } from "./user";

export interface IUpdatePost {
  id?: number;
  caption: string;
  imageUrl: string | null;
  location: string | null;
  tags: string;
  likes_count: number | null;
  comment_count: number | null;
  creator_id: number | null;
  created_at: Date | undefined;
  updated_at: Date | undefined;
  user: IUser;
  post_id?: number;
  user_id?: number;
  isLiked: boolean;
  isSaved: boolean;
}

export interface ISavedPost {
  id: number;
  user_id: number;
  post_id: number;
  saved_date?: Date;
  likes_count: number | null;
}
