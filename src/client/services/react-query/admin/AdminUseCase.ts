import { IAdminRepository } from "./IAdminRepository";
import { CreateAdmin } from "./interface";

// ** This class is used to create a new admin ** //
export class CreateAdminUseCase {
  constructor(private adminRespo: IAdminRepository) {}
  async execute(admin: CreateAdmin): Promise<CreateAdmin> {
    return await this.adminRespo.createAdmin(admin);
  }
}

export default { CreateAdminUseCase };
