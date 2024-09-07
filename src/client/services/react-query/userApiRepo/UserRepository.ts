// ** This file is used to interact with the server and make requests to the server ** //
// ** UserRepository.ts ** //
import { IUserRepository } from "./IUserRepository";
import { AxiosConfig } from "../../../axios/AxiosConfig";
import { INewUser, IUser } from "./index";
import {
  UnableToVerifyUser,
  UnauthorizedAccessError,
} from "../../../utils/AppError";
import axios from "axios";

export class UserRepository implements IUserRepository {
  // ** This method is used to register a new user ** //
  async registerUser(user: INewUser): Promise<INewUser> {
    try {
      const response = await AxiosConfig.post("/register", user);
      return response.data;
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status === 409
      ) {
        throw new Error(`Email ${user.email} is already in use.`);
      }
      // Throw a generic BadRequestError for other cases
      throw new Error(`Email ${user.email} is already in use.`);
    }
  }

  // ** This method is used to login a user ** //
  async loginUser(email: string, password: string): Promise<INewUser> {
    try {
      const response = await AxiosConfig.post("/login", { email, password });
      return response.data;
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status === 401
      ) {
        throw new UnauthorizedAccessError(
          `Invalid email or password for email ${email}`
        );
      }
      throw new Error("Invalid email or password.");
    }
  }

  // ** This method verifies a logged in user and persists the user details ** //
  async verifyUser(token: string): Promise<IUser> {
    try {
      const response = await AxiosConfig.post("/verify", { token });
      return response.data;
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status === 401
      ) {
        throw new UnableToVerifyUser(
          "Unable to verify user! Something went wrong"
        );
      }
      throw new Error("Unable to verify user! Something went wrong");
    }
  }
}
