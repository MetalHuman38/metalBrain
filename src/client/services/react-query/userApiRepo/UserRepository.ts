// ** This file is used to interact with the server and make requests to the server ** //
// ** UserRepository.ts ** //
import { IUserRepository } from "./IUserRepository";
import { AxiosConfig } from "../../../axios/AxiosConfig";
import { INewUser, IRefreshToken, IUser } from "../../entities/user";
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
  async loginUser(email: string, password: string): Promise<IUser | null> {
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
      sessionStorage.setItem("user", JSON.stringify(response.data.user));
      console.log("Response from login user", response.data.user);
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
  async logoutUser(id: string): Promise<void> {
    try {
      const response = await AxiosConfig.post("/logout", {
        id: id,
      });

      if (response.status === 200) {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("refreshtoken");
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("users");
        sessionStorage.removeItem("profileUser");
        sessionStorage.removeItem("followStatus");
        delete AxiosConfig.defaults.headers.common["Authorization"];
        document.cookie =
          "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie =
          "refreshtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie =
          "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie =
          "users=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie =
          "profileUser=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie =
          "followStatus=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      } else {
        throw new Error("Unable to logout user");
      }
      return response.data;
    } catch (error) {
      throw new Error("Unable to logout user");
    }
  }

  // ** This method verifies a logged in user and persists the user details ** //
  async verifyUser(id: string, role: string): Promise<IUser> {
    try {
      const response = await AxiosConfig.get("/verify", {
        params: { id, role },
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        return response.data.user;
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
      const token = sessionStorage.getItem("token");
      const response = await AxiosConfig.get("/currentUser", {
        params: { id: id },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        sessionStorage.setItem(
          "profileUser",
          JSON.stringify(response.data.user)
        );
        return response.data.user;
      }
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

  // ** This method gets all users ** //
  async getAllUsers(limit: number, offset: number): Promise<any> {
    try {
      const response = await AxiosConfig.get("/allUsers", {
        params: { limit, offset },
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log("Response from get all users", response.data.users);
      return response.data;
    } catch (error) {
      throw new Error("Unable to get users");
    }
  }

  // ** This method searches for users using search VALUE** //
  async searchUsers(searchValue: string): Promise<any> {
    try {
      const response = await AxiosConfig.get("/searchUsers", {
        params: { searchValue },
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error("Unable to search for users");
    }
  }

  // ** This method gets all users count ** //
  async getAllUsersCount(limit: number, offset: number): Promise<any> {
    try {
      const response = await AxiosConfig.get("/allUsersCount", {
        params: { limit, offset },
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error("Unable to get users count");
    }
  }

  // ** This method fetches all user activities ** //
  async fetchUserActivities(): Promise<any> {
    try {
      const response = await AxiosConfig.get("/userActivities", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error("Unable to fetch user activities");
    }
  }
}
