// ** User Authentication and Authorization ** //
import { INewUser, IUser } from "../userrepo/index.js";

export interface IUserRepository {
  createUser(user: INewUser): Promise<INewUser>;

  findUserByEmail(email: string): Promise<INewUser | null>;

  // ** This method is seperate from the below method to allow for a more secure way of finding a user by id ** //
  findUserById(id: number): Promise<INewUser | null>;

  // ** This method is used to authenticate a logged in user and return the user details ** //
  findUsersById(id: number): Promise<IUser | null>;

  // ** This method is in SequelizeUserRepo but not in use in the app  IGNORE!! ** //
  verifyUser(token: string): Promise<IUser | null>;

  // ** This method is used to authenticate a logged in user and return the user details ** //
  findLoggedInUser(
    token: string,
    id: string,
    role: string
  ): Promise<IUser | null>;

  // ** This method is used to authenticate a logged in user and return the user details ** //
  loginUser(email: string, password: string): Promise<INewUser | null>;

  // ** This method is used to authenticate a logged in user and return the user details ** //
  logoutUser(email: string): Promise<INewUser>;
}

export default IUserRepository;
