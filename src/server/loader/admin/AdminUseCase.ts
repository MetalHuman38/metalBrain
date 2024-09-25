import IAdminRepository from "./IAdminRepository.js";
import { IAdmin } from ".";
import { Admin } from "./index.js";
import {
  AdminNotFoundError,
  BadRequestError,
  ErrorPromotingUserToSuperAdmin,
  ErrorVerifyingToken,
  ForbiddenError,
  SuperAdminOnlyError,
  UnauthorizedError,
} from "../utils/app-errors.js";
import IJwtHandler from "../../services/jwtHandler.js";

// ** AdminUseCase ** //
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
