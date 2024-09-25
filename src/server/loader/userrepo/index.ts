// ** New User Interface ** //
export interface INewUser {
  id?: number;
  new_user: string;
  username: string;
  email: string;
  password: string;
}

// ** User Interface ** //
export interface IUser {
  id?: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  reset_password_token: string;
  reset_password_expires: Date;
  status: string;
  bio: string;
  joined_date: Date;
  last_login: Date;
  last_logout: Date;
  last_activity: Date;
  role: string;
  avatarUrl: string;
  profile_picture: string;
  user_registration_id: number;
  created_at: Date;
  updated_at: Date;
}

// ** User Class ** //
export class users implements IUser {
  constructor(
    public id: number,
    public first_name: string,
    public last_name: string,
    public username: string,
    public email: string,
    public password: string,
    public reset_password_token: string,
    public reset_password_expires: Date,
    public status: string,
    public bio: string,
    public joined_date: Date,
    public last_login: Date,
    public last_logout: Date,
    public last_activity: Date,
    public role: string,
    public avatarUrl: string,
    public profile_picture: string,
    public user_registration_id: number,
    public created_at: Date,
    public updated_at: Date,
    public posts?: [],
    public followers?: []
  ) {}

  isAdmin(): boolean {
    return this.role === "admin";
  }
}

// ** Verify User Interface ** //
export interface IVerifyUser {
  id: number;
  role: string;
  token: string;
  user: IUser;
}

// ** Get current user interface ** //
export interface IGetCurrentUser {
  refreshToken: string;
}
