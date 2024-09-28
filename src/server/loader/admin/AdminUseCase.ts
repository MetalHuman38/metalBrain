import IAdminRepository from "./IAdminRepository.js";
import { CreateAdmin, IAdmin } from ".";
import { Admin } from "./index.js";
import {
  AdminNotFoundError,
  BadRequestError,
  ErrorCreatingUser,
  ErrorGeneratingToken,
  ErrorPromotingUserToSuperAdmin,
  ErrorVerifyingToken,
  ForbiddenError,
  PasswordValidationError,
  SuperAdminOnlyError,
  UnauthorizedError,
} from "../utils/app-errors.js";
import IJwtHandler from "../../services/jwtHandler.js";
import { IPasswordHasher } from "../../services/index.js";
import { IUser } from "../userrepo/index.js";
import { generateAvatarUrl } from "../utils/avatar.js";

// ** AdminUseCase ** //

// ** This method creates a new admin ** //
export class CreateAdminUseCase {
  constructor(
    private adminRepo: IAdminRepository,
    private passwordHasher: IPasswordHasher,
    private jwtHandler: IJwtHandler
  ) {}
  async createAdmin(
    admin: CreateAdmin
  ): Promise<{ admin: CreateAdmin; token: string }> {
    try {
      // ** Check if creator is superadmin ** //
      if (admin.role !== "superadmin") {
        throw new UnauthorizedError();
      }

      // ** Check if email is valid ** //
      if (!admin.email.includes("@")) {
        throw new Error("Invalid email address");
      }
      // ** Validate Password ** //
      this.passwordHasher.validatePassword(admin.password);

      // ** Hash Password ** //
      const hashedPassword = await this.passwordHasher.hashPassword(
        admin.password
      );
      if (!hashedPassword) {
        throw new PasswordValidationError(); // Customized error message
      }

      // ** Create Admin ** //
      const newAdmin = await this.adminRepo.createAdmin({
        ...admin,
        password: hashedPassword,
      });
      if (!newAdmin) {
        throw new BadRequestError();
      }
      // ** Generate Token ** //
      const token = this.jwtHandler.jwtGenerator({
        id: newAdmin.id as number,
        role: "admin",
      });
      if (!token) {
        throw new ErrorGeneratingToken();
      }

      // ** Update User Table ** //
      await new UpdateUserUseCase(this.adminRepo).UpdateUser(
        newAdmin,
        hashedPassword
      );
      // ** Return new admin and token ** //
      return { admin: newAdmin, token };
    } catch (error: any) {
      // Handle repository or validation errors
      throw new BadRequestError();
    }
  }
}

// ** Update user table with extracted details from registerUserUseCase ** //
export class UpdateUserUseCase {
  constructor(private adminRepo: IAdminRepository) {}

  async UpdateUser(
    newAdmin: CreateAdmin,
    hashedPassword: string
  ): Promise<void> {
    try {
      const spaceIndex = newAdmin.new_admin.indexOf(" ");
      const first_name =
        spaceIndex != -1
          ? newAdmin.new_admin.slice(0, spaceIndex)
          : newAdmin.new_admin;
      const last_name =
        spaceIndex != -1 ? newAdmin.new_admin.slice(spaceIndex + 1) : "";
      const avatarUrl = generateAvatarUrl(first_name, last_name);

      const userRecord: IUser = {
        first_name: first_name,
        last_name: last_name,
        username: newAdmin.username,
        email: newAdmin.email,
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
        user_registration_id: newAdmin.id as number,
        created_at: new Date(),
        updated_at: new Date(),
      };
      await this.adminRepo.upsertUser(userRecord);
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

// ** The AdminUseCase class is used to get admins by role ** //
export class AdminUseCase {
  constructor(private adminRepo: IAdminRepository) {}
  // ** Get admins by role ** //
  async getAdmins(id: string, role: string): Promise<IAdmin[]> {
    try {
      const admins = await this.adminRepo.findbyRoleAndId(id, role);
      if (
        !admins.length ||
        !admins.some(
          (admin) => admin.role === "admin" || admin.role === "superadmin"
        )
      ) {
        throw new AdminNotFoundError();
      }
      // ** Return admins ** //
      return admins.map((admin) => new Admin(admin.id, admin.role));
    } catch (error: any) {
      // Handle repository or validation errors
      if (error instanceof AdminNotFoundError) {
        throw error; // Rethrow specific errors for the controller to handle
      }
      // Handle unexpected errors
      throw new BadRequestError();
    }
  }
}

// ** Promote to superadmin. Method should update roles dynamically and manage admin permissions efficiently ** //
export class AdminPromoteUseCase {
  constructor(private adminRepo: IAdminRepository) {}
  // ** Promote to superadmin ** //
  async promoteToSuperAdmin(
    id: string,
    usertobePromoted: string
  ): Promise<IAdmin> {
    try {
      const promotedadmin = await this.adminRepo.promoteToSuperAdmin(
        id,
        usertobePromoted
      );
      if (!promotedadmin) {
        throw new ErrorPromotingUserToSuperAdmin();
      }
      console.log("Promoted Admin", promotedadmin);
      return promotedadmin;
    } catch (error: any) {
      // ** Handle repository or validation errors ** //
      if (error instanceof ErrorPromotingUserToSuperAdmin) {
        throw error; // ** Rethrow specific errors for the controller to handle ** //
      }
      // ** Handle unexpected errors ** //
      throw new ForbiddenError();
    }
  }
}

// ** RestrictedAdminActionUseCase ** //
export class RestrictedSuperAdminActionUseCase {
  constructor(private adminRepo: IAdminRepository) {}

  // ** Get admins by role ** //
  async performSuperAdminAction(id: string, role: string): Promise<IAdmin[]> {
    try {
      const admins = await this.adminRepo.findbyRoleAndId(id, role);
      if (
        !admins.length ||
        !admins.some((admin) => admin.role === "superadmin")
      ) {
        throw new SuperAdminOnlyError();
      }
      // ** Return admins ** //
      return admins.map((admin) => new Admin(admin.id, admin.role));
    } catch (error: any) {
      // ** Handle repository or validation errors ** //
      if (error instanceof SuperAdminOnlyError) {
        throw error; // ** Rethrow specific errors for the controller to handle ** //
      }
      // ** Handle unexpected errors ** //
      throw new BadRequestError();
    }
  }
}

// ** Verify Admin Use Cases ** //
export class VerifysuperAdminUseCase {
  constructor(
    private superAdminRepository: IAdminRepository,
    private jwtHandler: IJwtHandler
  ) {}
  async VerifySuperAdmin(token: string): Promise<IAdmin> {
    try {
      // ** Decode Token ** //
      const decodedToken = this.jwtHandler.jwtVerifier(token);
      if (!decodedToken) {
        throw new ErrorVerifyingToken();
      }

      console.log("Decoded Token", decodedToken);

      // ** Retrieve User ID and Role From Token ** //
      const id = decodedToken.id as number;
      // ** Retrieve User Role From Token ** //
      const role = decodedToken.role as string;
      if (!id || role !== "superadmin") {
        throw new UnauthorizedError();
      }

      console.log("superadmin id and role", id, role);

      // ** Find SuperAdmin with the id and role retrieved from the token ** //
      const superadmin = await this.superAdminRepository.findSuperAdmin(
        id,
        "superadmin"
      );
      if (!superadmin) {
        throw new UnauthorizedError();
      }

      console.log("superadmin", superadmin);

      // ** Return User ** //
      return superadmin;
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
      console.error("Unexpected error during superadmin verification:", error);
      throw new Error("An unexpected error occurred during user verification.");
    }
  }
}

export default {
  AdminUseCase,
  AdminPromoteUseCase,
  RestrictedSuperAdminActionUseCase,
  VerifysuperAdminUseCase,
};
