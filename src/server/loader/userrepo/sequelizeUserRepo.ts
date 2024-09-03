import user_registrations from "../sequelize/models/usermodels/userregistration.model.js";
import UserRegistrationsAttributes from "../sequelize/models/usermodels/userregistration.model.js";
import { INewUser } from "../types/index.js";
import IUserRepository from "../userrepo/IUserRepository.js";

export class SequelizeUserRepo implements IUserRepository {
  async createUser(user: INewUser): Promise<UserRegistrationsAttributes> {
    const newUser = await user_registrations.create({
      new_user: user.new_user,
      username: user.username,
      email: user.email,
      password: user.password,
      created_at: user.created_at,
    });
    return newUser.toJSON() as UserRegistrationsAttributes;
  }

  async findUserByEmail(
    email: string,
  ): Promise<UserRegistrationsAttributes | null> {
    const user = await user_registrations.findOne({ where: { email } });
    return user ? (user.toJSON() as UserRegistrationsAttributes) : null;
  }

  async findUserById(id: number): Promise<UserRegistrationsAttributes | null> {
    const user = await user_registrations.findByPk(id);
    return user ? (user.toJSON() as UserRegistrationsAttributes) : null;
  }

  async loginUser(
    email: string,
    password: string,
  ): Promise<UserRegistrationsAttributes | null> {
    const user = await user_registrations.findOne({
      where: { email, password },
    });
    return user ? (user.toJSON() as UserRegistrationsAttributes) : null;
  }

  async logoutUser(email: string): Promise<UserRegistrationsAttributes> {
    try {
      const user = await user_registrations.findOne({ where: { email } });
      if (!user) {
        throw new Error("User not found");
      }
      return user.toJSON() as UserRegistrationsAttributes;
    } catch (error) {
      console.log("Error logging out user", error);
      throw new Error("Error logging out user");
    }
  }
}

export default { SequelizeUserRepo };
