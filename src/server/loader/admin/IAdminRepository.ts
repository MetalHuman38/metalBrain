import { IUser } from "../userrepo/index.js";
import { CreateAdmin, IAdmin } from "./index.js";

export interface IAdminRepository {
  createAdmin(admin: CreateAdmin): Promise<CreateAdmin>;
  upsertUser(user: IUser): Promise<void>;
  findbyRoleAndId(id: string, role: string): Promise<IAdmin[]>;
  promoteToSuperAdmin(id: string, usertobePromoted: string): Promise<IAdmin>;
  findSuperAdmin(id: number, role: string): Promise<IAdmin>;
}

export default IAdminRepository;
