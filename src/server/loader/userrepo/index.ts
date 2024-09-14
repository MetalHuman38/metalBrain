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
  status: string;
  bio: string;
  last_activity: Date;
  role: string;
  avatarUrl: string;
  profile_picture: string;
  user_registration_id: number;
  created_at: Date;
}

// ** User Class ** //
export class user implements IUser {
  constructor(
    public id: number,
    public first_name: string,
    public last_name: string,
    public username: string,
    public email: string,
    public password: string,
    public status: string,
    public bio: string,
    public last_activity: Date,
    public role: string,
    public avatarUrl: string,
    public profile_picture: string,
    public user_registration_id: number,
    public created_at: Date,
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
}

// ** Get current user interface ** //
export interface IGetCurrentUser {
  refreshToken: string;
}
