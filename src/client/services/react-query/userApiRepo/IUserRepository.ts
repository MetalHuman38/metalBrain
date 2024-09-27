// ** This file is used to define the interface for the user repository ** //
// ** IUserRepository.ts ** //
import {
  INewUser,
  IRefreshToken,
  IUser,
  IUserActivities,
} from "../../entities/user";

export interface IUserRepository {
  registerUser(user: INewUser): Promise<INewUser>;
  loginUser(email: string, password: string): Promise<IUser | null>;
  logoutUser(id: string): Promise<void>;
  verifyUser(id: string, role: string): Promise<IUser | null>;
  refreshtoken(id: string, role: string): Promise<IRefreshToken>;
  getCurrentUser(id: string): Promise<any>;
  getAllUsers(limit: number, offset: number): Promise<any>;
  // ** This method is used to search for users using search value ** //
  searchUsers(searchValue: string): Promise<any>;
  getAllUsersCount(limit: number, offset: number): Promise<any>;
  // ** This method fetches all user activities ** //
  fetchUserActivities(): Promise<IUserActivities[]>;
}

export default IUserRepository;
