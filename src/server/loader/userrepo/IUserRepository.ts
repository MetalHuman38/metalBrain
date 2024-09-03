// ** Userregistration Repository Interface ** //
import { INewUser } from "../userrepo/index.js";

export interface IUserRepository {
  createUser(user: INewUser): Promise<INewUser>;

  findUserByEmail(email: string): Promise<INewUser | null>;

  findUserById(id: number): Promise<INewUser | null>;

  loginUser(email: string, password: string): Promise<INewUser | null>;

  logoutUser(email: string): Promise<INewUser>;
}

export default IUserRepository;
