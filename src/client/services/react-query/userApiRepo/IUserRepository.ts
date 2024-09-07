// ** This file is used to define the interface for the user repository ** //
// ** IUserRepository.ts ** //
import { INewUser, IUser } from "./index";

export interface IUserRepository {
  registerUser(user: INewUser): Promise<INewUser>;
  loginUser(email: string, password: string): Promise<INewUser>;
  verifyUser(token: string): Promise<IUser>;
}

export default IUserRepository;
