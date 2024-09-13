// ** User Authentication and Authorization ** //
import { INewUser, IUser, IVerifyUser } from "../userrepo/index.js";

export interface IUserRepository {
  createUser(user: INewUser): Promise<INewUser>;

  findUserByEmail(email: string): Promise<IUser | null>;

  // ** This method is seperate from the below method to allow for a more secure way of finding a user by id ** //
  findUserById(id: number): Promise<INewUser | null>;

  // ** This method is used to authenticate a logged in user and return the user details ** //
  findUsersById(id: number): Promise<IUser | null>;

  // ** This method is in SequelizeUserRepo but not in use in the app  IGNORE!! ** //
  verifyUser(id: string): Promise<IVerifyUser | null>;

  // ** This method is used to authenticate a logged in user and return the user details ** //
  findLoggedInUser(
    token: string,
    id: string,
    role: string
  ): Promise<IUser | null>;

  // ** This method is used to authenticate a logged in user and return the user details ** //
  loginUser(email: string, password: string): Promise<IUser | null>;

  // ** This method is used to log out a user** //
  logoutUser(email: string): Promise<IUser>;

  // ** This method is used to get current logged in user ** //
  getCurrentUser(id: number): Promise<IUser | null>;
}

export default IUserRepository;
