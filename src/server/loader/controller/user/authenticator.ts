import { Request, Response } from "express";
import {
  GetCurrentUserUseCase,
  LoginUserUseCase,
  LogoutUserUseCase,
  RefreshTokenUseCase,
  RegisterUserUseCase,
  VerifyUserUseCase,
} from "../../userrepo/userUseCases.js";
import {
  BadRequestError,
  ErrorCreatingUser,
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
      const refreshtoken = user.refreshtoken;

      console.log("Token: ", token);
      console.log("Refresh Token: ", refreshtoken);

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
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        throw new NoRefreshTokenError();
      }
      const id = refreshToken.id;
      const role = refreshToken.role;
      if (!id || role) {
        throw new UnauthorizedError();
      }

      const user = await this.refreshTokenUseCase.RefreshToken(id, role);
      if (!user) {
        throw new Error("Error refreshing token");
      }

      res.cookie("refreshToken", refreshToken, {
        httpOnly: jwtENV.JWT_COOKIE_HTTP_ONLY,
        sameSite: "strict",
        secure: jwtENV.JWT_COOKIE_SECURE,
        maxAge: jwtENV.JWT_USER_REFRESH_MAX_AGE,
      });

      res.status(200).json({
        message: "Token refreshed successfully",
        id: user.id,
        user: user.role,
        resfreshToken: refreshToken,
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
    } catch (error: any) {
      throw new Error("Error logging out user");
    }
  }
}

// ** This is where the error is. Should be attended to ** //
// ** Verify User Controller ** //
export class VerifyUser {
  constructor(private verifyUserUseCase: VerifyUserUseCase) {}
  async verifyUser(req: Request, _res: Response) {
    try {
      const token = req.cookies.token;
      if (!token) {
        throw new NoTokenError();
      }
      console.log("token: ", token);
      const decodedToken = await this.verifyUserUseCase.VerifyUser(token);
      const id = decodedToken.id;
      const role = decodedToken.role;
      console.log("ID: ", id);
      console.log("Role: ", role);
      if (!id || !role) {
        throw new UnauthorizedError();
      }
    } catch (error: any) {
      throw new Error("Something went wrong");
    }
  }
}

// ** Get current user Controller ** //
export class GetCurrentUser {
  constructor(
    private getCurrentUserUseCase: GetCurrentUserUseCase,
    private verifyUserUseCase: VerifyUserUseCase
  ) {}

  async getCurrentUser(req: Request, res: Response) {
    try {
      const refreshtoken = req.cookies.refreshtoken;
      if (!refreshtoken) {
        throw new NoTokenError();
      }
      const decodedtoken =
        await this.verifyUserUseCase.VerifyUser(refreshtoken);
      const id = decodedtoken.id;
      const role = decodedtoken.role;
      if (!id || !role) {
        throw new UnauthorizedError();
      }
      const user = await this.getCurrentUserUseCase.GetCurrentUser(
        decodedtoken.id
      );
      if (!user) {
        res.status(401).json({ message: "Unauthorized from the backend" });
        throw new InternalServerError();
      }
    } catch (error: any) {
      console.log(error);
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
};
