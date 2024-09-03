export interface INewUser {
  id?: number;
  new_user: string;
  username: string;
  email: string;
  password: string;
  created_at: Date;
}

export interface ILoginUser {
  username: string;
  password: string;
}

export interface ILogoutUser {
  email: string;
}

export interface findUserByEmail {
  email: string;
}
