import user_registrations from "../sequelize/models/usermodels/userregistration.model.js";
import UserRegistrationsAttributes from "../sequelize/models/usermodels/userregistration.model.js";
import { INewUser, IUser } from "./index.js";
import IUserRepository from "../userrepo/IUserRepository.js";
import users from "../sequelize/models/usermodels/users.model.js";
import { UnauthorizedError } from "../utils/app-errors.js";

export class SequelizeUserRepo implements IUserRepository {
  // ** This method is used to create a new user ** //
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

  // ** This method findUsersById is used to authenticate a logged in user and return the user details ** //
  async findUsersById(id: number): Promise<IUser | null> {
    const user = await users.findOne({
      where: { id },
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
    if (!user) {
      throw new UnauthorizedError();
    }
    return user ? (user.toJSON() as IUser) : null;
  }

  // ** MUST BE REMOVED ** //
  async verifyUser(id: string): Promise<IUser | null> {
    const user = await users.findOne({
      where: { id: id },
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
    if (!user) {
      throw new UnauthorizedError();
    }
    return null;
  }

  // ** This method is used to authenticate a logged in user and return the user details ** //
  async findUserByEmail(
    email: string
  ): Promise<UserRegistrationsAttributes | null> {
    const user = await user_registrations.findOne({ where: { email } });
    return user ? (user.toJSON() as UserRegistrationsAttributes) : null;
  }

  // ** This method is seperate from the below method to allow for a more secure way of finding a user by id ** //
  async findUserById(id: number): Promise<UserRegistrationsAttributes | null> {
    const user = await user_registrations.findByPk(id, {
      attributes: ["id", "new_user", "username", "email", "created_at"],
    });
    return user ? (user.toJSON() as UserRegistrationsAttributes) : null;
  }

  // ** This method is seperate from the above method to allow for a more secure way of finding a user by id ** //
  async findLoggedInUser(id: string): Promise<IUser | null> {
    const user = await users.findByPk(id, {
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
        "posts",
        "followers",
      ],
    });
    if (!user) return null;
    return {
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      status: user.status,
      bio: user.bio,
      last_activity: user.last_activity,
      role: user.role,
      avatarUrl: user.avatarUrl,
      profile_picture: user.profile_picture,
      user_registration_id: user.user_registration_id,
      created_at: user.created_at,
    };
  }

  // ** This method is used to authenticate a logged in user and return the user details ** //
  async loginUser(
    email: string,
    password: string
  ): Promise<UserRegistrationsAttributes | null> {
    const user = await user_registrations.findOne({
      where: { email, password },
      attributes: ["new_user", "username", "created_at"],
    });
    return user ? (user.toJSON() as UserRegistrationsAttributes) : null;
  }

  // ** This method is used to authenticate a logged in user and return the user details
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
