import { IUser } from "./user";

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
