import { IAdmin } from ".";
import users from "../sequelize/models/usermodels/users.model.js";
import { UnauthorizedError } from "../utils/app-errors.js";
import IAdminRepository from "./IAdminRepository.js";

export class SequelizeAdminRepo implements IAdminRepository {
  // ** This method is used to promote a user to a superadmin ** //
  async findbyRoleAndId(id: string, role: string): Promise<IAdmin[]> {
    const admin = await users.findAll({
      where: { id: id, role: role },
      attributes: [
        "id",
        "first_name",
        "last_name",
        "username",
        "status",
        "bio",
        "last_activity",
        "role",
        "avatarUrl",
        "profile_picture",
        "user_registration_id",
        "created_at",
      ],
    });
    return admin.map((admin) => admin.toJSON() as IAdmin);
  }

  // ** This method is used to promote a user to a superadmin ** //
  async promoteToSuperAdmin(
    id: string,
    usertobePromoted: string
  ): Promise<IAdmin> {
    const admin = await users.findOne({
      where: { id: id },
      attributes: ["id", "role", "avatarUrl", "profile_picture"],
    });
    if (!admin || admin.role !== "superadmin") {
      throw new UnauthorizedError();
    }
    // ** Fetch target user and update role to superadmin ** //
    const target = await users.findOne({
      where: { id: usertobePromoted },
      attributes: ["id", "role", "avatarUrl", "profile_picture"],
    });
    if (!target) {
      throw new UnauthorizedError();
    }
    target.role = "admin";
    await target.save();
    return target.toJSON() as IAdmin;
  }

  // ** Find SuperAdmin by id and Role ** //
  async findSuperAdmin(id: number): Promise<IAdmin> {
    const super_admin = await users.findOne({
      where: { id: id, role: "superadmin" },
    });
    if (!super_admin) {
      throw new UnauthorizedError();
    }
    return super_admin.toJSON() as IAdmin;
  }
}

export default SequelizeAdminRepo;
