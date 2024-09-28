import { Request, Response } from "express";
import {
  GetAllUsersCountUseCase,
  GetAllUsersUseCase,
  GetCurrentUserUseCase,
  GetUsersActivitiesUseCase,
  LoginUserUseCase,
  LogoutUserUseCase,
  RefreshTokenUseCase,
  RegisterUserUseCase,
  SearchUsersUseCase,
  VerifyUserEmailUseCase,
  VerifyUserUseCase,
} from "../../userrepo/userUseCases.js";
import {
  BadRequestError,
  ErrorCreatingUser,
  ErrorVerifyingToken,
  InternalServerError,
  InvalidCredentialsError,
  NoRefreshTokenError,
  NoTokenError,
  UnauthorizedError,
} from "../../utils/app-errors.js";
import jwtENV from "../../config/jwtENV.js";

// ** Register User Controller ** //
export class RegisterUser {
  constructor(private registerUserUseCase: RegisterUserUseCase) {}

  async registerUser(req: Request, res: Response) {
    try {
      const { new_user, username, email, password } = req.body;
      if (!new_user || !username || !email || !password) {
        throw new BadRequestError();
      }
      const user = await this.registerUserUseCase.RegisterUser({
        new_user: new_user,
        username: username,
        email: email,
        password: password,
      });

      if (!user) {
        throw new ErrorCreatingUser();
      }
      res.status(201).json({
        message: "User created successfully",
        user: user.user,
      });
    } catch (error: any) {
      throw new BadRequestError();
    }
  }
}

// ** Login User Controller ** //
export class LoginUser {
  constructor(private loginUserUseCase: LoginUserUseCase) {}

  async loginUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw new BadRequestError();
      }
      const user = await this.loginUserUseCase.LoginUser(email, password);
      if (!user) {
        throw new InvalidCredentialsError();
      }

      const token = user.token;
      if (!token) {
        throw new InvalidCredentialsError();
      }
      const refreshtoken = user.refreshtoken;
      if (!refreshtoken) {
        throw new InvalidCredentialsError();
      }

      res.cookie("token", token, {
        httpOnly: jwtENV.JWT_COOKIE_HTTP_ONLY,
        sameSite: "strict",
        secure: jwtENV.JWT_COOKIE_SECURE,
        maxAge: jwtENV.JWT_USER_MAX_AGE,
      });

      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: jwtENV.JWT_COOKIE_HTTP_ONLY,
        sameSite: "strict",
        secure: jwtENV.JWT_COOKIE_SECURE,
        maxAge: jwtENV.JWT_USER_REFRESH_MAX_AGE,
      });

      res.status(200).json({
        message: "User logged in successfully",
        user: user.user,
        token: token,
        refreshtoken: refreshtoken,
      });
    } catch (error: any) {
      throw new InvalidCredentialsError();
    }
  }
}

// ** Refresh Token Controller ** //
export class RefreshToken {
  constructor(private refreshTokenUseCase: RefreshTokenUseCase) {}

  async refreshToken(req: Request, res: Response) {
    try {
      const refreshtoken = req.cookies.refreshtoken;
      if (!refreshtoken) {
        throw new NoRefreshTokenError();
      }
      const id = refreshtoken.id;
      const role = refreshtoken.role;
      if (!id || role) {
        throw new UnauthorizedError();
      }

      const user = await this.refreshTokenUseCase.RefreshToken(id, role);
      if (!user) {
        throw new Error("Error refreshing token");
      }

      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: jwtENV.JWT_COOKIE_HTTP_ONLY,
        sameSite: "strict",
        secure: jwtENV.JWT_COOKIE_SECURE,
        maxAge: jwtENV.JWT_USER_REFRESH_MAX_AGE,
      });

      res.status(200).json({
        message: "Token refreshed successfully",
        id: user.id,
        user: user.role,
        resfreshtoken: refreshtoken,
      });
    } catch (error: any) {
      if (error instanceof NoRefreshTokenError) {
        throw new NoRefreshTokenError();
      } else {
        throw new InternalServerError();
      }
    }
  }
}

// ** Logout User Controller ** //
export class LogoutUser {
  constructor(private logoutUserUseCase: LogoutUserUseCase) {}
  async logoutUser(req: Request, res: Response) {
    try {
      const token = req.cookies.token;
      if (!token) {
        throw new NoTokenError();
      }
      await this.logoutUserUseCase.LogoutUser(token);
      res.clearCookie("token");
      res.clearCookie("refreshtoken");
      res.clearCookie("user");
      res.clearCookie("users");
      res.clearCookie("profileUser");
      res.clearCookie("followStatus");
    } catch (error: any) {
      throw new Error("Error logging out user");
    }
  }
}

// ** This is where the error is. Should be attended to ** //
// ** Verify User Controller ** //
export class VerifyUser {
  constructor(private verifyUserUseCase: VerifyUserUseCase) {}
  async verifyUser(req: Request, res: Response) {
    try {
      // ** Decode Token ** //
      const token = req.cookies.token;
      if (!token) {
        throw new ErrorVerifyingToken();
      }
      console.log("token: ", token);
      const id = parseInt(req.query.id as string, 10);
      const role = req.query.role as string;
      if (!id || !role) {
        throw new UnauthorizedError();
      }
      console.log("ID: ", id);
      console.log("Role: ", role);
      if (!id || !role) {
        throw new UnauthorizedError();
      }
      const user = await this.verifyUserUseCase.VerifyUser(token);
      if (!user) {
        throw new UnauthorizedError();
      }
      res.status(200).json({
        message: "User verified successfully",
        user: user,
        id: id,
        role: role,
      });
    } catch (error: any) {
      throw new Error("Something went wrong");
    }
  }
}

// ** This method verifies user after they click on the link sent to their email ** //
// ** Verify User Email Controller ** //
export class VerifyUserEmail {
  constructor(private verifyUserEmailUseCase: VerifyUserEmailUseCase) {}
  async verifyUserEmail(req: Request, res: Response) {
    try {
      const token = req.body.token as string;
      if (!token) {
        throw new ErrorVerifyingToken();
      }
      const user = await this.verifyUserEmailUseCase.VerifyUserEmail(token);
      res.status(200).json({
        message: "User verified successfully",
        user: user,
        token: token,
      });
    } catch (error: any) {
      throw new Error("Something went wrong");
    }
  }
}

// ** Get current user Controller ** //
export class GetCurrentUser {
  constructor(private getCurrentUserUseCase: GetCurrentUserUseCase) {}

  async getCurrentUser(req: Request, res: Response) {
    try {
      const id = parseInt(req.query.id as string, 10);
      const user = await this.getCurrentUserUseCase.GetCurrentUser(id);
      if (!user) {
        res.status(401).json({ message: "Unauthorized from the backend" });
        throw new InternalServerError();
      }
    } catch (error: any) {
      console.log(error);
    }
  }
}

// ** Get All Users Controller ** //
export class GetAllUsers {
  constructor(private getAllUsersUseCase: GetAllUsersUseCase) {}
  async getAllUsers(req: Request, res: Response) {
    try {
      const limit = parseInt(req.query.limit as string, 10) || 10;
      const offset = parseInt(req.query.offset as string, 10) || 0;
      // Check if limit is a valid number and offset is not negative
      if (isNaN(limit) || limit <= 0 || isNaN(offset) || offset < 0) {
        throw new BadRequestError();
      }
      console.log("Limit: ", limit);
      console.log("Offset: ", offset);
      const users = await this.getAllUsersUseCase.GetAllUsers(
        Number(limit),
        Number(offset)
      );
      if (!users) {
        throw new InternalServerError();
      }
      res.status(200).json({
        users,
        limit,
        offset,
        message: "Users fetched successfully",
      });
    } catch (error: any) {
      console.log(error);
      res.status(500).json({
        message: "Internal Server Error from get all users controller",
      });
    }
  }
}

// ** Search Users Controller ** //
export class SearchUsers {
  constructor(private searchUsersUseCase: SearchUsersUseCase) {}
  async searchUsers(req: Request, res: Response) {
    try {
      const searchValue = req.body.searchValue;
      if (!searchValue) {
        throw new BadRequestError();
      }
      console.log("Search Value: ", searchValue);
      const users = await this.searchUsersUseCase.SearchUsers(searchValue);
      if (!users) {
        throw new InternalServerError();
      }
      res.status(200).json({
        users,
        searchValue,
        message: "Users fetched successfully",
      });
    } catch (error: any) {
      console.log(error);
      res.status(500).json({
        message: "Internal Server Error from search users controller",
      });
    }
  }
}

// ** GetAllUserCount Controller ** //
export class GetAllUserCount {
  constructor(private getAllUsersCountUseCase: GetAllUsersCountUseCase) {}
  async getAllUserCount(req: Request, res: Response) {
    try {
      const { page = 0 } = req.query;
      const limit = parseInt(req.query.limit as string, 10) || 10;
      const offset = page ? parseInt(page as string, 10) * limit : 0;
      const count = await this.getAllUsersCountUseCase.GetAllUsersCount(
        limit,
        offset
      );
      if (!count) {
        throw new InternalServerError();
      }
      res.status(200).json({
        count,
        page,
        limit,
        offset,
        message: "User count fetched successfully",
      });
    } catch (error: any) {
      console.log(error);
      res.status(500).json({
        message: "Internal Server Error from get all user count controller",
      });
    }
  }
}

// ** Get all users activities Controller ** //
export class GetUsersActivities {
  constructor(private getUserActivitiesUseCase: GetUsersActivitiesUseCase) {}
  async getUserActivities(_req: Request, res: Response) {
    try {
      const activities =
        await this.getUserActivitiesUseCase.GetAllUsersActivities();
      if (!activities) {
        throw new InternalServerError();
      }
      res.status(200).json({
        activities,
        message: "User activities fetched successfully",
      });
    } catch (error: any) {
      console.log(error);
      res.status(500).json({
        message: "Internal Server Error from get user activities controller",
      });
    }
  }
}

export default {
  RegisterUser,
  LoginUser,
  RefreshToken,
  LogoutUser,
  VerifyUser,
  GetCurrentUser,
  GetAllUsers,
  SearchUsers,
  GetAllUserCount,
};
