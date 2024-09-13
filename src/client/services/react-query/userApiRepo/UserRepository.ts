// ** This file is used to interact with the server and make requests to the server ** //
// ** UserRepository.ts ** //
import { IUserRepository } from "./IUserRepository";
import { AxiosConfig } from "../../../axios/AxiosConfig";
import {
  INewUser,
  IRefreshToken,
  IUser,
  IVerifyUser,
} from "../../entities/user";
import {
  ErrorRefreshingToken,
  ErrorVerifyingToken,
  LoginError,
  UnauthorizedError,
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
  async loginUser(email: string, password: string): Promise<IUser> {
    try {
      const response = await AxiosConfig.post(
        "/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      sessionStorage.setItem("token", response.data.token);
      sessionStorage.setItem("refreshtoken", response.data.refreshtoken);
      AxiosConfig.defaults.headers.common["Authorization"] =
        `Bearer ${response.data.token}`;
      return response.data;
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status === 401
      ) {
        throw new LoginError();
      } else {
        throw new Error("Unable to login user");
      }
    }
  }

  // ** This method logs out a user ** //
  async logoutUser(email: string): Promise<IUser> {
    try {
      const response = await AxiosConfig.post("/logout", {
        email,
      });
      if (response.status === 200) {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("refreshtoken");
        delete AxiosConfig.defaults.headers.common["Authorization"];
        document.cookie =
          "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie =
          "refreshtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      } else {
        throw new Error("Unable to logout user");
      }
      return response.data;
    } catch (error) {
      throw new Error("Unable to logout user");
    }
  }

  // ** This method verifies a logged in user and persists the user details ** //
  async verifyUser(id: string): Promise<IVerifyUser> {
    try {
      const response = await AxiosConfig.get("/verify", {
        params: { id },
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        return response.data;
      }
      return response.data;
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status === 401
      ) {
        throw new ErrorVerifyingToken();
      }
      throw new Error("Unable to verify user! Something went wrong");
    }
  }

  // ** This method is used to refresh the user token ** //
  async refreshtoken(id: string, role: string): Promise<IRefreshToken> {
    try {
      const response = await AxiosConfig.post(
        "/refreshToken",
        { id, role },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      sessionStorage.setItem("refreshtoken", response.data.refreshtoken);
      return response.data.refreshtoken;
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status === 401
      ) {
        throw new ErrorRefreshingToken();
      }
      throw new Error("Invalid token");
    }
  }

  // ** This method gets current user by id and role ** //
  async getCurrentUser(id: string): Promise<IUser> {
    try {
      const refreshtoken = sessionStorage.getItem("refreshtoken");
      const response = await AxiosConfig.get("/currentUser", {
        params: { id: id },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${refreshtoken}`,
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status === 401
      ) {
        throw new UnauthorizedError();
      }
      throw new Error("Invalid token");
    }
  }
}
