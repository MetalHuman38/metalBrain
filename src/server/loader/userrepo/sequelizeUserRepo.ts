import user_registrations from "../sequelize/models/usermodels/userregistration.model.js";
import UserRegistrationsAttributes from "../sequelize/models/usermodels/userregistration.model.js";
import UserAttributes from "../sequelize/models/usermodels/users.model.js";
import { INewUser, IUser } from "./index.js";
import IUserRepository from "../userrepo/IUserRepository.js";
import users from "../sequelize/models/usermodels/users.model.js";
import { UnauthorizedError } from "../utils/app-errors.js";
import { Op } from "sequelize";

export class SequelizeUserRepo implements IUserRepository {
  // ** This method is used to create a new user ** //
  async createUser(user: INewUser): Promise<user_registrations> {
    const newUser = await user_registrations.create({
      new_user: user.new_user,
      username: user.username,
      email: user.email,
      password: user.password,
      created_at: new Date(),
    });
    return newUser.toJSON() as UserRegistrationsAttributes;
  }

  // ** This method is used to update a user ** //
  async upsertUser(user: UserAttributes): Promise<void> {
    await users.upsert(user as UserAttributes);
  }

  // ** This method is used to authenticate a logged in user and return the user details ** //
  async loginUser(email: string, password: string): Promise<IUser | null> {
    const user = await users.findOne({
      where: { email, password },
      attributes: ["id", "new_user", "username", "email", "created_at"],
    });
    return user ? (user.toJSON() as UserAttributes) : null;
  }

  // ** This method is used to verify a user ** //
  async verifyUser(token: string): Promise<void> {
    console.log("Verifying user with token: ", token);
    return;
  }

  // ** This method is used to verify a user's email ** //
  async verifyUserEmail(token: string): Promise<void> {
    console.log("Verifying user email with token: ", token);
    return;
  }

  // ** This method findUsersById is used to authenticate a logged in user and return the user details ** //
  async findUsersById(id: number): Promise<users | null> {
    const user = await users.findOne({
      where: { id },
      attributes: [
        "id",
        "first_name",
        "last_name",
        "username",
        "email",
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
    return user ? (user.toJSON() as UserAttributes) : null;
  }

  // ** This method is used to authenticate a logged in user and return the user details ** //
  async findUserByEmail(email: string): Promise<IUser | null> {
    const user = await users.findOne({ where: { email } });
    return user ? (user.toJSON() as UserAttributes) : null;
  }

  // ** This method is used to find a user by username ** //
  async findUserName(username: string): Promise<user_registrations | null> {
    const user = await user_registrations.findOne({ where: { username } });
    return user ? (user.toJSON() as UserRegistrationsAttributes) : null;
  }

  // ** This method is seperate from the below method to allow for a more secure way of finding a user by id ** //
  async findUserById(id: number): Promise<user_registrations | null> {
    const user = await user_registrations.findByPk(id, {
      attributes: ["id", "new_user", "username", "email", "created_at"],
    });
    return user ? (user.toJSON() as UserRegistrationsAttributes) : null;
  }

  // ** This method is seperate from the above method to allow for a more secure way of finding a user by id ** //
  async findLoggedInUser(id: string): Promise<users | null> {
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
    return user ? (user.toJSON() as UserAttributes) : null;
  }

  // ** This method is used to authenticate a logged in user and return the user details
  async logoutUser(id: string): Promise<void> {
    try {
      const user = await users.findOne({ where: { id: id } });
      if (!user) {
        throw new Error("User not found");
      }
      return;
    } catch (error) {
      console.log("Error logging out user", error);
      throw new Error("Error logging out user");
    }
  }

  // ** This method is used to get current logged in user ** //
  async getCurrentUser(id: number): Promise<users | null> {
    try {
      const usersArray = await users.findByPk(id, {
        attributes: [
          "id",
          "first_name",
          "last_name",
          "username",
          "avatarUrl",
          "profile_picture",
          "user_registration_id",
        ],
      });
      if (!usersArray) {
        throw new Error("User not found");
      }
      return usersArray.toJSON() as UserAttributes;
    } catch (error) {
      console.log("Error getting current user in sequelize repo", error);
      throw new Error("Error getting current user");
    }
  }

  // ** This method is used to get all users ** //
  async getAllUsers(limit: number, offset: number): Promise<users[] | null> {
    try {
      const allUsersArray: UserAttributes[] | null = await users.findAll({
        limit: limit,
        offset: offset,
        attributes: [
          "id",
          "first_name",
          "last_name",
          "username",
          "avatarUrl",
          "profile_picture",
          "user_registration_id",
        ],
      });
      if (!allUsersArray) {
        throw new Error("Users not found");
      }
      return allUsersArray.map((user) => user.toJSON()) as UserAttributes[];
    } catch (error) {
      console.log("Error getting all users in sequelize repo", error);
      throw new Error("Error getting all users");
    }
  }

  // ** This method is used to search for users using search value ** //
  async searchUsers(searchValue: string): Promise<users[] | null> {
    try {
      const searchUsersArray: UserAttributes[] | null = await users.findAll({
        where: {
          [Op.or]: [
            { first_name: { [Op.like]: `%${searchValue}%` } },
            { last_name: { [Op.like]: `%${searchValue}%` } },
            { username: { [Op.like]: `%${searchValue}%` } },
          ],
        },
        attributes: [
          "id",
          "first_name",
          "last_name",
          "username",
          "avatarUrl",
          "profile_picture",
          "user_registration_id",
        ],
      });
      if (!searchUsersArray) {
        throw new Error("Users not found");
      }
      return searchUsersArray.map((user) => user.toJSON()) as UserAttributes[];
    } catch (error) {
      console.log("Error searching for users in sequelize repo", error);
      throw new Error("Error searching for users");
    }
  }

  // ** This method is used to get All users with counts and pagination ** //
  async getAllUsersCount(limit: number, offset: number): Promise<any> {
    try {
      const allUsersArray = await users.findAndCountAll({
        limit: limit,
        offset: offset,
        attributes: [
          "id",
          "first_name",
          "last_name",
          "username",
          "avatarUrl",
          "profile_picture",
          "user_registration_id",
        ],
      });
      if (!allUsersArray) {
        throw new Error("Users not found");
      }
      return {
        users: allUsersArray.rows.map((user) =>
          user.toJSON()
        ) as UserAttributes[],
        count: allUsersArray.count,
        totalPages: Math.ceil(allUsersArray.count / limit),
        currentPage: offset / limit + 1,
      };
    } catch (error) {
      console.log("Error getting all users in sequelize repo", error);
      throw new Error("Error getting all users");
    }
  }

  // ** This method Update a single row "status" column in the users table after verifying registered user email ** //
  async updateUserStatus(id: number): Promise<void> {
    try {
      await users.update(
        { status: "verified" },
        {
          where: {
            id: id,
          },
        }
      );
      return;
    } catch (error) {
      console.log("Error updating user status in sequelize repo", error);
      throw new Error("Error updating user status");
    }
  }

  // ** This method sends verification email to user ** //
  async sendVerificationEmail(email: string, token: string): Promise<void> {
    console.log("Sending verification email to: ", email);
    console.log("Verification token: ", token);
    return;
  }
}

export default { SequelizeUserRepo };
