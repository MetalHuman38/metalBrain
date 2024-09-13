// ** This file is used to define the interface for the user repository ** //
// ** IUserRepository.ts ** //
import {
  IUser,
  INewUser,
  IRefreshToken,
  IVerifyUser,
} from "../../entities/user";

export interface IUserRepository {
  registerUser(user: INewUser): Promise<INewUser>;
  loginUser(email: string, password: string): Promise<IUser>;
  logoutUser(email: string): Promise<IUser>;
  verifyUser(id: string): Promise<IVerifyUser>;
  refreshtoken(id: string, role: string): Promise<IRefreshToken>;
  getCurrentUser(id: string): Promise<IUser | null>;
}

export default IUserRepository;
