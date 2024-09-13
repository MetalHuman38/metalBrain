export interface INewUser {
  id?: string;
  new_user: string;
  username: string;
  email: string;
  password: string;
  created_at: Date;
}

export interface INitialUser {
  id?: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  created_at: Date;
}

export interface IUser {
  id: string;
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

export class user implements IUser {
  constructor(
    public id: string, // Change the type of 'id' property from number to string
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
  // A method to check if the user is active
  isActive(): boolean {
    return this.status === "active";
  }

  // A method to update the user's bio
  updateBio(newBio: string): void {
    this.bio = newBio;
  }

  // A method to format the user's full name
  getFullName(): string {
    return `${this.first_name} ${this.last_name}`;
  }
}

export interface IRefreshToken {
  id: number;
  role: string;
}

// ** Get Current User Interface ** //
export interface ICurrentUser {
  id: number;
  role: string;
}

// ** Verify User Interface ** //
export interface IVerifyUser {
  id: number;
  role: string;
  token: string;
}
