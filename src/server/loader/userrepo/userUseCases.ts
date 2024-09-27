import { IUserRepository } from "./IUserRepository.js";
import { IEmailService, IPasswordHasher } from "../../services/index.js";
import { IJwtHandler } from "../../services/jwtHandler.js";
import { INewUser, IUser, IUserActivities } from "./index.js";
// ** Error Thrown are custom errors imported from app-errors.js ** //
import {
  EmailAlreadyInUse,
  ErrorCreatingUser,
  ErrorGeneratingToken,
  ErrorRefreshingToken,
  ErrorVerifyingToken,
  InvalidPasswordError,
  LoginError,
  PasswordValidationError,
  UnauthorizedError,
  UserNameAlreadyInUse,
  UserWithIdNotFoundError,
} from "../utils/app-errors.js";
import { generateAvatarUrl } from "../utils/avatar.js";
import EmailTemplateService from "../../services/emailService.js";
import { Admin } from "../admin/index.js";

// ** Register User Use Case ** //
export class RegisterUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private passwordHasher: IPasswordHasher,
    private jwtHandler: IJwtHandler,
    private emailService: IEmailService
  ) {}

  // ** Register User Use Case Method ** //
  async RegisterUser(
    user: INewUser
  ): Promise<{ user: INewUser; token: string }> {
    try {
      // ** Check if Email already exists ** //
      const userExists = await this.userRepository.findUserByEmail(user.email);
      if (userExists) {
        throw new EmailAlreadyInUse(); // Customized error message
      }
      // ** Check if email is valid ** //
      if (!user.email.includes("@")) {
        throw new Error("Invalid email address");
      }

      // ** Validate username if already exists ** //
      const usernameExists = await this.userRepository.findUserName(
        user.username
      );
      if (usernameExists) {
        throw new UserNameAlreadyInUse(); // Customized error message
      }

      // ** Validate Password ** //
      this.passwordHasher.validatePassword(user.password);

      // ** Hash Password ** //
      const hashedPassword = await this.passwordHasher.hashPassword(
        user.password
      );
      if (!hashedPassword) {
        throw new PasswordValidationError(); // Customized error message
      }

      // ** Create User ** //
      const newUser = await this.userRepository.createUser({
        ...user,
        password: hashedPassword,
      });
      if (!newUser) {
        throw new ErrorCreatingUser();
      }

      // ** Generate Token ** //
      const token = this.jwtHandler.jwtGenerator({
        id: newUser.id as number,
        role: "user",
      });
      if (!token) {
        throw new ErrorGeneratingToken();
      }

      // ** Send Verification Email ** //
      await new SendVerificationEmailUseCase(
        this.emailService,
        this.jwtHandler
      ).SendVerificationEmail(user.email, token);

      // ** Update User Table ** //
      await new UpdateUserUseCase(this.userRepository).UpdateUser(
        newUser,
        hashedPassword
      );

      // ** Return User and Token ** //
      return { user: newUser, token };
    } catch (error) {
      // ** Log and handle different types of errors ** //
      if (
        error instanceof EmailAlreadyInUse ||
        error instanceof PasswordValidationError
      ) {
        console.error("Validation error during registration:", error.message);
        throw error; // ** Rethrow to be handled by the upper layers ** //
      }

      if (
        error instanceof ErrorCreatingUser ||
        error instanceof ErrorGeneratingToken
      ) {
        console.error(
          "User creation or token generation error:",
          error.message
        );
        throw error; // ** Rethrow to be handled by the upper layers ** //
      }

      // ** Fallback for unexpected errors ** //
      console.error("Unexpected error during user registration:", error);
      throw new Error("An unexpected error occurred during user registration.");
    }
  }
}

// ** Update user table with extracted details from registerUserUseCase ** //
export class UpdateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async UpdateUser(newUser: INewUser, hashedPassword: string): Promise<void> {
    try {
      const spaceIndex = newUser.new_user.indexOf(" ");
      const first_name =
        spaceIndex != -1
          ? newUser.new_user.slice(0, spaceIndex)
          : newUser.new_user;
      const last_name =
        spaceIndex != -1 ? newUser.new_user.slice(spaceIndex + 1) : "";
      const avatarUrl = generateAvatarUrl(first_name, last_name);

      const userRecord: IUser = {
        first_name: first_name,
        last_name: last_name,
        username: newUser.username,
        email: newUser.email,
        password: hashedPassword,
        reset_password_token: "",
        reset_password_expires: new Date(),
        status: "active",
        bio: "The world is yours for the taking",
        joined_date: new Date(),
        last_login: new Date(),
        last_logout: new Date(),
        last_activity: new Date(),
        role: "user",
        avatarUrl: avatarUrl,
        profile_picture: avatarUrl,
        user_registration_id: newUser.id as number,
        created_at: new Date(),
        updated_at: new Date(),
      };

      await this.userRepository.upsertUser(userRecord);
    } catch (error) {
      // ** Log and handle specific errors ** //
      if (error instanceof ErrorCreatingUser) {
        console.error("Error updating user:", error.message);
        throw error; // ** Rethrow specific errors for upper layers to handle ** //
      }
      // ** Fallback for unexpected errors ** //
      console.error("Unexpected error during user update:", error);
      throw new Error("An unexpected error occurred during user update.");
    }
  }
}

// ** Login User Use Case ** //
export class LoginUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private jwtHandler: IJwtHandler,
    private passwordHasher: IPasswordHasher
  ) {}

  // ** Login User Use Case Method ** //
  async LoginUser(
    email: string,
    password: string
  ): Promise<{
    user: IUser;
    token: string;
    refreshtoken: string;
  }> {
    try {
      // ** Find User by Email ** //
      const user = await this.userRepository.findUserByEmail(email);
      if (!user) {
        throw new LoginError();
      }
      // ** Compare Password ** //
      const comparePassword = await this.passwordHasher.comparePassword(
        password,
        user.password
      );
      if (!comparePassword) {
        throw new InvalidPasswordError();
      }

      const user_role = user.role;

      // ** Generate Token ** //
      const token = this.jwtHandler.jwtGenerator({
        id: user.id as number,
        role: user_role,
      });
      if (!token) {
        throw new ErrorGeneratingToken();
      }

      // ** Generate Refresh Token ** //
      const refreshtoken = this.jwtHandler.jwtRefreshGenerator({
        id: user.id as number,
        role: user_role,
      });
      if (!refreshtoken) {
        throw new ErrorRefreshingToken();
      }

      // ** Remove sensitive data before sending the user object ** //
      delete (user as { password?: string }).password;
      delete (user as { email?: string }).email;

      // ** Return User, Token and Refresh Token ** //
      return { user, token, refreshtoken };
    } catch (error) {
      // ** Handle and log the error based on its type ** //
      if (
        error instanceof LoginError ||
        error instanceof InvalidPasswordError
      ) {
        console.error("Authentication error:", error.message);
        throw error; // ** Rethrow to be handled by upper layers ** //
      }

      if (
        error instanceof ErrorGeneratingToken ||
        error instanceof ErrorRefreshingToken
      ) {
        console.error("Token generation error:", error.message);
        throw error; // ** Rethrow to be handled by upper layers ** //
      }
      // ** Fallback for unexpected errors ** //
      console.error("Unexpected error during login:", error);
      throw new Error("An unexpected error occurred during login.");
    }
  }
}

// ** RefreshToken Use Case ** //
export class RefreshTokenUseCase {
  constructor(
    private userRepository: IUserRepository,
    private jwtHandler: IJwtHandler
  ) {}

  // ** Refresh Token Use Case Method ** //
  async RefreshToken(
    id: string,
    role: string
  ): Promise<{
    id: string;
    role: string;
  }> {
    try {
      // ** Decode Token ** //
      const decodedToken = this.jwtHandler.jwtVerifier(id);
      if (!decodedToken) {
        throw new ErrorVerifyingToken();
      }

      // ** Find User by ID ** //
      const user = await this.userRepository.findUsersById(
        decodedToken.id as number
      );
      if (!user) {
        throw new UserWithIdNotFoundError();
      }

      // ** Generate refresh Token ** //
      const token = this.jwtHandler.jwtRefreshGenerator({
        id: user.id as number,
        role: role,
      });
      if (!token) {
        throw new ErrorGeneratingToken();
      }
      return { id, role };
    } catch (error) {
      // **  Log and handle specific errors ** //
      if (
        error instanceof ErrorVerifyingToken ||
        error instanceof UserWithIdNotFoundError
      ) {
        console.error(
          "Token verification or user lookup error:",
          error.message
        );
        throw error; // ** Rethrow specific errors for upper layers to handle ** //
      }

      if (error instanceof ErrorGeneratingToken) {
        console.error("Token generation error:", error.message);
        throw error; // ** Rethrow specific errors for upper layers to handle ** //
      }
      // ** Fallback for unexpected errors ** //
      console.error("Unexpected error during token refresh:", error);
      throw new Error("An unexpected error occurred during token refresh.");
    }
  }
}

// ** Logout user uses case ** //
export class LogoutUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private jwtHandler: IJwtHandler
  ) {}

  async LogoutUser(token: string): Promise<void> {
    try {
      const decoded = this.jwtHandler.jwtVerifier(token);
      if (!decoded) {
        throw new ErrorVerifyingToken();
      }
      const id = decoded.id;
      if (!id) {
        throw new UnauthorizedError();
      }
      const user = await this.userRepository.findUsersById(id);
      if (!user) {
        throw new Error("User not found");
      }
      await this.userRepository.logoutUser(id.toString());
      return;
    } catch (error) {
      // ** Log and handle different types of errors ** //
      console.error("Error logging out user:", error);
      throw new Error("An unexpected error occurred during user logout.");
    }
  }
}

// ** Verify User Use Case with id, role and token ** //
export class VerifyUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private jwtHandler: IJwtHandler
  ) {}
  async VerifyUser(token: string): Promise<IUser> {
    try {
      // ** Decode Token ** //
      const decodedToken = this.jwtHandler.jwtVerifier(token);
      if (!decodedToken) {
        throw new ErrorVerifyingToken();
      }
      console.log("Decoded Token from verifyUsecase", decodedToken);
      // ** Retrieve User ID and Role From Token ** //
      const user_id = decodedToken.id as number;
      if (!user_id) {
        throw new UnauthorizedError();
      }

      // ** Retrieve User Role From Token ** //
      const role = decodedToken.role;
      if (!role) {
        throw new UnauthorizedError();
      }
      // ** Find User with the id retrieved from the token ** //
      const user = await this.userRepository.findUsersById(user_id);
      if (!user) {
        throw new UnauthorizedError();
      }

      // ** Create Admin entity to control access ** //
      const admin = new Admin(user.id as number, role);
      if (!admin.isUser() && !admin.isAdmin() && !admin.isSuperAdmin()) {
        throw new UnauthorizedError();
      }
      // ** Return User ** //
      return { ...user, role };
    } catch (error) {
      // ** Handle and log specific errors ** //
      if (
        error instanceof ErrorVerifyingToken ||
        error instanceof UnauthorizedError
      ) {
        console.error("Authorization error:", error.message);
        throw error; // ** Rethrow specific errors to be handled by the caller ** //
      }
      // ** Fallback for unexpected errors ** //
      console.error("Unexpected error during user verification:", error);
      throw new Error("An unexpected error occurred during user verification.");
    }
  }
}

// ** Verify User email after registration ** //
export class VerifyUserEmailUseCase {
  constructor(
    private userRepository: IUserRepository,
    private jwtHandler: IJwtHandler
  ) {}

  async VerifyUserEmail(token: string): Promise<void> {
    try {
      // ** Decode Token ** //
      const decodedToken = this.jwtHandler.jwtVerifyEmailVerification(token);
      if (!decodedToken) {
        throw new ErrorVerifyingToken();
      }
      console.log("Decoded Token from verifyUsecase", decodedToken);

      // ** Retrieve User Email From Token ** //
      const email = decodedToken.email;
      if (!email) {
        throw new UnauthorizedError();
      }

      // ** Verify User Email ** //
      await this.userRepository.verifyUserEmail(email);

      const user = await this.userRepository.findUserByEmail(email);
      if (!user) {
        throw new UnauthorizedError();
      }

      if (user.status === "verified") {
        throw new Error("Email already verified");
      }

      // ** Update User Status ** //
      await new UpdateUserStatusUseCase(this.userRepository).UpdateUserStatus(
        user.id as number
      );
    } catch (error) {
      // ** Log and handle specific errors ** //
      console.error("Error verifying user email:", error);
      throw new Error(
        "An unexpected error occurred during user email verification."
      );
    }
  }
}

// ** Update User Status Use Case ** //
export class UpdateUserStatusUseCase {
  constructor(private userRepository: IUserRepository) {}

  async UpdateUserStatus(id: number): Promise<void> {
    try {
      // ** Update User Status ** //
      await this.userRepository.updateUserStatus(id);
    } catch (error) {
      // ** Log and handle specific errors ** //
      console.error("Error updating user status:", error);
      throw new Error(
        "An unexpected error occurred during user status update."
      );
    }
  }
}

// ** Get Current User Use Case ** //
export class GetCurrentUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async GetCurrentUser(id: number): Promise<any> {
    try {
      // ** Find User by ID and Role ** //
      const user = await this.userRepository.getCurrentUser(id);
      if (id === null) {
        throw new UserWithIdNotFoundError();
      }
      // ** Return User ** //
      return user;
    } catch (error) {
      // ** Log and handle specific errors ** //
      if (error instanceof UserWithIdNotFoundError) {
        console.error("User not found:", error.message);
        throw error; // ** Rethrow specific errors to be handled by the caller ** //
      }
      // ** Fallback for unexpected errors ** //
      console.error("Unexpected error during user lookup:", error);
      throw new Error("An unexpected error occurred during user lookup.");
    }
  }
}

// ** Get All Users Use Case ** //
export class GetAllUsersUseCase {
  constructor(private userRepository: IUserRepository) {}

  async GetAllUsers(limit: number, offset: number): Promise<any> {
    try {
      // ** Retrieve all users ** //
      const users = await this.userRepository.getAllUsers(limit, offset);
      if (!users) {
        throw new Error("No users found");
      }
      // ** Return Users ** //
      return users;
    } catch (error) {
      // ** Log and handle specific errors ** //
      console.error("Error retrieving users:", error);
      throw new Error("An unexpected error occurred during user lookup.");
    }
  }
}

// ** Search Users Use Case ** //
export class SearchUsersUseCase {
  constructor(private userRepository: IUserRepository) {}

  async SearchUsers(searchValue: string): Promise<any> {
    try {
      // ** Search for users ** //
      const users = await this.userRepository.searchUsers(searchValue);
      if (!users) {
        throw new Error("No users found");
      }
      // ** Return Users ** //
      return users;
    } catch (error) {
      // ** Log and handle specific errors ** //
      console.error("Error searching for users:", error);
      throw new Error("An unexpected error occurred during user search.");
    }
  }
}

// ** getAllUsersCount Use Case ** //
export class GetAllUsersCountUseCase {
  constructor(private userRepository: IUserRepository) {}

  async GetAllUsersCount(limit: number, offset: number): Promise<any> {
    try {
      // ** Retrieve all users with count and pagination ** //
      const users = await this.userRepository.getAllUsersCount(limit, offset);
      if (!users) {
        throw new Error("No users found");
      }
      // ** Return Users ** //
      return users;
    } catch (error) {
      // ** Log and handle specific errors ** //
      console.error("Error retrieving users:", error);
      throw new Error("An unexpected error occurred during user lookup.");
    }
  }
}

// ** Send Verification Email Use Case ** //
export class SendVerificationEmailUseCase {
  constructor(
    private emailService: IEmailService,
    private jwtHandler: IJwtHandler
  ) {}

  async SendVerificationEmail(email: string, token: string): Promise<void> {
    try {
      const emailtoken = this.jwtHandler.jwtEmailVerificationGenerator({
        email: email,
        token: token,
        type: "",
      });
      if (!emailtoken) {
        throw new ErrorGeneratingToken();
      }
      console.log("Email Token", emailtoken);

      const baseUrl =
        process.env.NODE_ENV === "development"
          ? "https://metalbrain.net"
          : "http://localhost:8081";

      const verifylink = `${baseUrl}/api/verifyEmail/${emailtoken}`;

      const emailTemplateService = new EmailTemplateService();
      const emailTemplate = await emailTemplateService.getEmailTemplateById(
        "Verify Email",
        {
          link: verifylink,
        }
      );

      // ** Send Verification Email ** //
      await this.emailService.sendEmail(
        email,
        emailTemplate.subject,
        emailTemplate.html
      );
    } catch (error) {
      // ** Log and handle specific errors ** //
      console.error("Error sending verification email:", error);
      throw new Error("An unexpected error occurred during email sending.");
    }
  }
}

// ** Get all users activities use case ** //
export class GetUsersActivitiesUseCase {
  constructor(private userRepository: IUserRepository) {}

  async GetAllUsersActivities(): Promise<IUserActivities[]> {
    try {
      // ** Fetch all user activities ** //
      const activities = await this.userRepository.fetchUserActivities();
      if (!activities) {
        throw new Error("No activities found");
      }
      // ** Return Activities ** //
      return activities;
    } catch (error) {
      // ** Log and handle specific errors ** //
      console.error("Error fetching user activities:", error);
      throw new Error(
        "An unexpected error occurred during user activities fetch."
      );
    }
  }
}

export default {
  RegisterUserUseCase,
  LoginUserUseCase,
  RefreshTokenUseCase,
  LogoutUserUseCase,
  VerifyUserUseCase,
  GetCurrentUserUseCase,
  GetAllUsersUseCase,
  SearchUsersUseCase,
  GetAllUsersCountUseCase,
  UpdateUserUseCase,
  UpdateUserStatusUseCase,
  SendVerificationEmailUseCase,
  VerifyUserEmailUseCase,
  GetUsersActivitiesUseCase,
};
