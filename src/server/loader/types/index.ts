// ** jwt payload types ** //
export type IUserPayload = {
  id: number;
  role: string;
};

export type INewUser = {
  id: number;
  new_user: string;
  username: string;
  email: string;
  password: string;
  created_at: Date;
};
