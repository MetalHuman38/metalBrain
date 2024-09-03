import { IUserRepository } from "./IUserRepository.js";
import { IPasswordHasher } from "../../services/passwordHasher.js";
import { IJwtHandler } from "../../services/jwtHandler.js";
import { INewUser } from "./index.js";

// ** Register User Use Case ** //
export class RegisterUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private passwordHasher: IPasswordHasher,
    private jwtHandler: IJwtHandler,
  ) {}

  async RegisterUser(
    user: INewUser,
  ): Promise<{ user: INewUser; token: string }> {
    const userExists = await this.userRepository.findUserByEmail(user.email);
    if (userExists) {
      throw new Error("User already exists");
    }

    const hashedPassword = await this.passwordHasher.hashPassword(
      user.password,
    );
    const newUser = await this.userRepository.createUser({
      ...user,
      password: hashedPassword,
    });

    const token = this.jwtHandler.jwtGenerator({
      id: newUser.id as number,
      role: "user",
    });

    return { user: newUser, token };
  }
}

// ** Login User Use Case ** //
export class LoginUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private jwtHandler: IJwtHandler,
    private passwordHasher: IPasswordHasher,
  ) {}

  async LoginUser(
    email: string,
    password: string,
  ): Promise<{
    user: INewUser;
    token: string;
    refreshToken: string;
  }> {
    const user = await this.userRepository.findUserByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }

    const comparePassword = await this.passwordHasher.comparePassword(
      password,
      user.password,
    );
    if (!comparePassword) {
      throw new Error("Invalid password credentials");
    }

    const token = this.jwtHandler.jwtGenerator({
      id: user.id as number,
      role: "user",
    });

    const refreshToken = this.jwtHandler.jwtRefreshGenerator({
      id: user.id as number,
      role: "user",
    });

    return { user, token, refreshToken };
  }
}

// ** RefreshToken Use Case ** //
export class RefreshTokenUseCase {
  constructor(
    private userRepository: IUserRepository,
    private jwtHandler: IJwtHandler,
  ) {}

  async RefreshToken(refreshToken: string): Promise<{
    user: INewUser;
    token: string;
    refreshToken: string;
  }> {
    const decodedToken = this.jwtHandler.jwtVerifier(refreshToken);
    if (!decodedToken) {
      throw new Error("Invalid token");
    }

    const user = await this.userRepository.findUserById(
      decodedToken.id as number,
    );
    if (!user) {
      throw new Error("User not found");
    }

    const token = this.jwtHandler.jwtGenerator({
      id: user.id as number,
      role: "user",
    });

    return { user, refreshToken, token };
  }
}

export default { RegisterUserUseCase, LoginUserUseCase };
