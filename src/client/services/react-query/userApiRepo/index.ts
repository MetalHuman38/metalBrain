export interface INewUser {
  id?: string;
  new_user: string;
  username: string;
  email: string;
  password: string;
  created_at: Date;
}

export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  status: string;
  bio: string;
  last_activity: Date;
  role: string;
  avatarUrl: string;
  profile_picture: string;
  user_registration_id: number;
  created_at: Date;
}
