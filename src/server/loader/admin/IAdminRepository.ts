import { IAdmin } from "./index.js";

export interface IAdminRepository {
  findbyRoleAndId(id: string, role: string): Promise<IAdmin[]>;
  promoteToSuperAdmin(id: string, usertobePromoted: string): Promise<IAdmin>;
  findSuperAdmin(id: number, role: string): Promise<IAdmin>;
}

export default IAdminRepository;
