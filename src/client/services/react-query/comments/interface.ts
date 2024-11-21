// ** This file is used for defining types for comments service ** //

export interface IComment {
  id: number;
  user_id: number;
  post_id: number;
  parent_comment_id: number;
  like_count: number;
  status: string;
  is_edited: boolean;
  edited_at: Date;
  content: string;
  created_at: Date;
  updated_at: Date;
  replies?: IComment[];
}

export interface ICreateComment {
  user_id: number;
  post_id: number;
  parent_comment_id?: number | null;
  content: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface IUpdateComment {
  id?: number;
  user_id: number;
  post_id: number;
  content: string;
  parent_comment_id: number;
}

export interface ILikeComment {
  id: number;
  user_id: number;
  comment_id: number;
  created_at: Date;
}

export interface IUnLikeComment {
  user_id: number;
  comment_id: number;
}

export interface IDeleteComment {
  id: number;
}
