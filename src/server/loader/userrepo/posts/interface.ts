export interface IPost {
  id: number;
  caption: string;
  imageUrl: string | null;
  location: string | null;
  tags: string;
  likes_count: number | null;
  comment_count: number | null;
  creator_id: number;
  created_at: Date | undefined;
  updated_at: Date | undefined;
}

export interface IUpdatePost {
  id: number;
  caption: string;
  imageUrl: string | null;
  location: string | null;
  tags: string;
  likes_count: number | null;
  creator_id: number;
  created_at: Date | undefined;
  updated_at: Date | undefined;
}

export interface IMageStorage {
  id: number;
  imageUrl: string | null;
  image_id: number | null;
  post_id: number | null;
  creator_id: number;
  created_at: Date | null;
}

export interface ISavedPost {
  id?: number;
  user_id: number;
  post_id: number;
  saved_date?: Date;
}

export interface IUnSavedPost {
  user_id: number;
  post_id: number;
}

export interface ILikedPost {
  id?: number;
  user_id: number;
  post_id: number;
  created_at?: Date;
}

export interface IUnLikedPost {
  user_id: number;
  post_id: number;
}
