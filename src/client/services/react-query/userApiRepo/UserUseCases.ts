// ** User Use Cases ** //
import { INewUser, IRefreshToken, IUser } from "../../entities/user";
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
  async execute(email: string, password: string): Promise<IUser | null> {
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
  async execute(id: string, role: string): Promise<IUser | null> {
    return this.userRepository.verifyUser(id, role);
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
  async execute(id: string): Promise<any> {
    return this.userRepository.getCurrentUser(id);
  }
}

// ** Get all users Use Case ** //
export class GetAllUsersUseCase {
  constructor(private userRepository: IUserRepository) {}
  async execute(limit: number, offset: number): Promise<any> {
    return this.userRepository.getAllUsers(limit, offset);
  }
}

// ** Search Users Use Case ** //
export class SearchUsersUseCase {
  constructor(private userRepository: IUserRepository) {}
  async execute(searchValue: string): Promise<any> {
    return this.userRepository.searchUsers(searchValue);
  }
}

// ** Get All Users Count Use Case ** //
export class GetAllUsersCountUseCase {
  constructor(private userRepository: IUserRepository) {}
  async execute(limit: number, offset: number): Promise<any> {
    return this.userRepository.getAllUsersCount(limit, offset);
  }
}

export default {
  RegisterUserUseCase,
  LoginUserUseCase,
  VerifyUserUseCase,
  RefreshTokenUseCase,
  GetCurrentUserUseCase,
  GetAllUsersUseCase,
  SearchUsersUseCase,
  GetAllUsersCountUseCase,
};
