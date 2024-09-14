// ** User Use Cases ** //
import {
  INewUser,
  IRefreshToken,
  IUser,
  IVerifyUser,
} from "../../entities/user";
import { IUserRepository } from "./IUserRepository";

// ** Register User Use Case ** //
export class RegisterUserUseCase {
  constructor(private userRepository: IUserRepository) {}
  async execute(user: INewUser): Promise<INewUser> {
    return this.userRepository.registerUser(user);
  }
}

// ** Login User Use Case ** //
export class LoginUserUseCase {
  constructor(private userRepository: IUserRepository) {}
  async execute(email: string, password: string): Promise<IUser> {
    return this.userRepository.loginUser(email, password);
  }
}

// ** Logout User Use Case ** //
export class LogoutUserUseCase {
  constructor(private userRepository: IUserRepository) {}
  async execute(id: string): Promise<void> {
    return this.userRepository.logoutUser(id);
  }
}

// ** Verify User Use Case ** //
export class VerifyUserUseCase {
  constructor(private userRepository: IUserRepository) {}
  async execute(id: string): Promise<IVerifyUser> {
    return this.userRepository.verifyUser(id);
  }
}

// ** Refresh Token Use Case ** //
export class RefreshTokenUseCase {
  constructor(private userRepository: IUserRepository) {}
  async execute(id: string, role: string): Promise<IRefreshToken> {
    return this.userRepository.refreshtoken(id, role);
  }
}

// ** Get current user Use Case ** //
export class GetCurrentUserUseCase {
  constructor(private userRepository: IUserRepository) {}
  async execute(id: string): Promise<IUser | null> {
    return this.userRepository.getCurrentUser(id);
  }
}

export default {
  RegisterUserUseCase,
  LoginUserUseCase,
  VerifyUserUseCase,
  RefreshTokenUseCase,
};
