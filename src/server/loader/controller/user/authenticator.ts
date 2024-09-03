import { Request, Response } from "express";
import {
  LoginUserUseCase,
  RefreshTokenUseCase,
  RegisterUserUseCase,
} from "../../userrepo/userUseCases.js";

// ** Register User Controller ** //
export class RegisterUser {
  constructor(private registerUserUseCase: RegisterUserUseCase) {}

  async registerUser(req: Request, res: Response) {
    try {
      const { name, username, email, password } = req.body;
      if (!name || !username || !email || !password) {
        throw new Error("Missing fields in request body");
      }
      const user = await this.registerUserUseCase.RegisterUser({
        new_user: name,
        username: username,
        email: email,
        password: password,
        created_at: new Date(),
      });

      if (!user) {
        throw new Error("Error creating user");
      }
      res.cookie("token", user.token, {
        httpOnly: true,
        sameSite: "strict",
        secure: true,
      });
      res.status(201).json({
        message: "User created successfully",
        user: user.user,
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message || "An error occurred" });
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
        throw new Error("Missing fields in request body");
      }
      const user = await this.loginUserUseCase.LoginUser(email, password);

      if (!user) {
        throw new Error("Error logging in user");
      }
      res.cookie("token", user.token, {
        httpOnly: true,
        sameSite: "strict",
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      });

      res.cookie("refreshToken", user.refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      });

      res.status(200).json({
        message: "User logged in successfully",
        user: user.user,
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
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
        throw new Error("Missing fields in request body");
      }
      const user = await this.refreshTokenUseCase.RefreshToken(refreshToken);

      if (!user) {
        throw new Error("Error refreshing token");
      }

      res.cookie("refreshToken", user.refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      });

      res.status(200).json({
        message: "Token refreshed successfully",
        user: user.user,
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default { RegisterUser, LoginUser, RefreshToken };
