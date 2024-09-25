// ** User Authentication and Authorization ** //
import { INewUser, IUser, IUserActivities } from "../userrepo/index.js";

export interface IUserRepository {
  createUser(user: INewUser): Promise<INewUser>;

  upsertUser(user: IUser): Promise<void>;

  findUserByEmail(email: string): Promise<IUser | null>;

  findUserName(username: string): Promise<any>;

  // ** This method is seperate from the below method to allow for a more secure way of finding a user by id ** //
  findUserById(id: number): Promise<INewUser | null>;

  // ** This method is used to authenticate a logged in user and return the user details ** //
  findUsersById(id: number): Promise<IUser | null>;

  // ** This method is in SequelizeUserRepo but not in use in the app  IGNORE!! ** //
  verifyUser(token: string): Promise<void>;

  // ** This method verifies token sent to a user during registration and updates their status to "verified". NOTE: The mthod is not the same as the above method ** //
  verifyUserEmail(token: string): Promise<void>;

  // ** This method is used to authenticate a logged in user and return the user details ** //
  findLoggedInUser(
    token: string,
    id: string,
    role: string
  ): Promise<IUser | null>;

  // ** This method is used to authenticate a logged in user and return the user details ** //
  loginUser(email: string, password: string): Promise<IUser | null>;

  // ** This method is used to log out a user** //
  logoutUser(id: string): Promise<void>;

  // ** This method is used to get current logged in user ** //
  getCurrentUser(id: number): Promise<any>;

  // ** This method is used to get all users ** //
  getAllUsers(limit: number, offset: number): Promise<any>;

  // ** This method is used to search for users using search value ** //
  searchUsers(searchValue: string): Promise<any>;

  // ** This method is used to get All users with counts and pagination ** //
  getAllUsersCount(limit: number, offset: number): Promise<any>;

  // ** This method Update a single row "status" column in the users table after verifying registered user email ** //
  updateUserStatus(id: number): Promise<void>;

  // ** This method sends verification email to user ** //
  sendVerificationEmail(email: string, token: string): Promise<void>;

  // ** This method fetches all user activities ** //
  fetchUserActivities(): Promise<IUserActivities>;
}

export default IUserRepository;
