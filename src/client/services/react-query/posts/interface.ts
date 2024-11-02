import { IUser } from "../../entities/user";

export interface IPost {
  id?: number;
  caption: string;
  imageUrl: string | null;
  location: string | null;
  tags: string;
  likes_count: number | null;
  creator_id: number | null;
  created_at: Date | undefined;
  updated_at: Date | undefined;
  user: IUser;
}

export interface IUpdatePost {
  id?: number;
  caption: string;
  imageUrl: string | null;
  location: string | null;
  tags: string;
  likes_count: number | null;
  creator_id: number | null;
  created_at: Date | undefined;
  updated_at: Date | undefined;
  user: IUser;
}

export interface IMageStorage {
  id?: number;
  imageUrl: string | null;
  image_id: number | null;
  post_id: number | null;
  creator_id: number;
  created_at: Date | null;
}
