export type IUser = {
  id?: string;
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
  posts?: []; // Loaded only when necessary
  followers?: [];
};
