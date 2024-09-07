import { Request, Response } from "express";
import {
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
      const { name, username, email, password } = req.body;
      if (!name || !username || !email || !password) {
        throw new BadRequestError();
      }
      const user = await this.registerUserUseCase.RegisterUser({
        new_user: name,
        username: username,
        email: email,
        password: password,
        created_at: new Date(),
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
      res.cookie("token", user.token, {
        httpOnly: jwtENV.JWT_COOKIE_HTTP_ONLY,
        sameSite: "strict",
        secure: jwtENV.JWT_COOKIE_SECURE,
        maxAge: jwtENV.JWT_USER_MAX_AGE,
      });

      res.cookie("refreshToken", user.refreshToken, {
        httpOnly: jwtENV.JWT_COOKIE_HTTP_ONLY,
        sameSite: "strict",
        secure: jwtENV.JWT_COOKIE_SECURE,
        maxAge: jwtENV.JWT_USER_REFRESH_MAX_AGE,
      });

      res.status(200).json({
        message: "User logged in successfully",
        user: user.user,
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
        user: user.role,
      });
    } catch (error: any) {
      throw new NoRefreshTokenError();
    }
  }
}

// ** Logout User Controller ** //
export class LogoutUser {
  constructor(private logoutUserUseCase: LogoutUserUseCase) {}

  async logoutUser(req: Request, res: Response) {
    try {
      const email = req.body.email;
      if (!email) {
        throw new BadRequestError();
      }
      const user = await this.logoutUserUseCase.LogoutUser(email);
      if (!user) {
        throw new InternalServerError();
      }

      res.clearCookie("token");
      res.clearCookie("refreshToken");
      res.status(200).json({ message: "User logged out successfully" });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}

// ** Verify User Controller ** //
export class VerifyUser {
  constructor(private verifyUserUseCase: VerifyUserUseCase) {}

  async verifyUser(req: Request, res: Response) {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        throw new NoTokenError();
      }
      await this.verifyUserUseCase.VerifyUser(refreshToken);
      if (!refreshToken) {
        throw new NoTokenError();
      }
      res.status(200).json({ message: "User verified successfully" });
    } catch (error: any) {
      res.status(500).json({ message: "error verifying user" });
      throw new Error("Something went wrong");
    }
  }
}

export default {
  RegisterUser,
  LoginUser,
  RefreshToken,
  LogoutUser,
  VerifyUser,
};
