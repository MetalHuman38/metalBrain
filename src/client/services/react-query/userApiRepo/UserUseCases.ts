// ** User Use Cases ** //
import { INewUser, IUser } from ".";
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

  async execute(email: string, password: string): Promise<INewUser> {
    return this.userRepository.loginUser(email, password);
  }
}

// ** Verify User Use Case ** //
export class VerifyUserUseCase {
  constructor(private userRepository: IUserRepository) {}
  async execute(token: string): Promise<IUser> {
    return this.userRepository.verifyUser(token);
  }
}
