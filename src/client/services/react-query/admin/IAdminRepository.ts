import { CreateAdmin } from "./interface";

export interface IAdminRepository {
  createAdmin(admin: CreateAdmin): Promise<CreateAdmin>;
}
