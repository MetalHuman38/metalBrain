import { NextFunction, Request, Response } from "express";
import {
  AdminPromoteUseCase,
  CreateAdminUseCase,
  RestrictedSuperAdminActionUseCase,
} from "../../admin/AdminUseCase";
import { IAdmin } from "../../admin";
import {
  BadRequestError,
  SuperAdminOnlyError,
  TokenError,
  UnauthorizedError,
} from "../../utils/app-errors.js";
import { JwtTokenService } from "../../../services/jwtTokenService.js";
import { ILogger } from ".";

// ** This controller is used to create new admin users ** //
export class AdminController {
  constructor(
    private createAdminUseCase: CreateAdminUseCase,
    private logger: ILogger
  ) {}

  async createAdmin(req: Request, res: Response): Promise<void> {
    try {
      const { new_admin, username, email, password, role } = req.body;
      if (!new_admin || !username || !email || !password || !role) {
        throw new BadRequestError();
      }
      this.logger.info("Request to create a new admin");
      const admin = await this.createAdminUseCase.createAdmin({
        new_admin: new_admin,
        username: username,
        email: email,
        password: password,
        role: role,
        created_at: new Date(),
      });
      this.logger.info(`Admin created successfully: ${admin}`);
      res.status(201).json({ message: "Admin created successfully", admin });
    } catch (error: any) {
      this.logger.error(
        `Error creating admin: ${error.message} at ${new Date().toISOString()}`
      );
      res.status(400).json({ message: "Bad Request! Admin not created" });
    }
  }
}

// ** Middleware to check if the user is an admin or superadmin before granting access to a route handler or another middleware **//
export class RoleAuthorizationMiddleware {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        throw new TokenError();
      }
      const decodedToken = new JwtTokenService().jwtVerifier(token);
      if (!decodedToken) {
        throw new TokenError();
      }
      const role = decodedToken.role;

      if (role !== "superadmin") {
        return res
          .status(403)
          .json({ message: "Access Denied! Super Admin Only." });
      }
    } catch (error: any) {
      if (error instanceof SuperAdminOnlyError) {
        res.status(403).json({ message: "Access Denied! Super Admin Only." });
      }
    }
    next();
  }
}

// ** Promote to superadmin. Method should update roles dynamically and manage admin permissions efficiently ** //
export class Authorizations {
  constructor(
    private adminPromote: AdminPromoteUseCase,
    private logger: ILogger
  ) {}

  async promoteToSuperAdmin(req: Request, res: Response): Promise<void> {
    this.logger.info("Request to promote user to superadmin");
    try {
      const { id, usertobePromoted } = req.body;
      if (!id || !usertobePromoted) {
        this.logger.error("Bad Request! Missing required fields");
        res.status(400).json({
          message: `Only Super Admin can perform this action. ${new Date().toISOString()}`,
        });
        return;
      }
      this.logger.info(`Promoting user with id ${id} to superadmin...`);
      const admin = await this.adminPromote.promoteToSuperAdmin(
        id,
        usertobePromoted
      );
      if (!admin) {
        this.logger.error(
          "Bad Request! You are not authorized to perform this action"
        );
        res.status(400).json({
          message: "Bad Request! You are not authorized to perform this action", // ** Handle unexpected errors ** //
        });
      }
      // ** update users role to superadmin ** //
      this.logger.info(`User with id ${id} promoted to superadmin`);
      res.status(200).json({ message: "User promoted to admin", admin });
    } catch (error: any) {
      this.logger.error(
        `Error promoting user to superadmin: ${error.message} at ${new Date().toISOString()}`
      );
      if (error instanceof SuperAdminOnlyError) {
        res.status(403).json({ message: "Access Denied! Super Admin Only." });
      } else if (error instanceof UnauthorizedError) {
        res.status(401).json({ message: "Unauthorized Attempt!" });
      } else {
        res.status(400).json({
          message: "Bad Request! You do not have the required permissions!",
        });
      }
    }
  }
}

// ** Method to restricted admin actions ** //
export class SuperAdminController {
  constructor(
    private restrictedSuperAdminOnlyAction: RestrictedSuperAdminActionUseCase,
    private logger: ILogger
  ) {}

  async restrictedSuperAdminAction(
    req: Request,
    res: Response
  ): Promise<IAdmin[]> {
    try {
      const { id, role } = req.body;
      this.logger.info(
        `[Audit Log] User ${id} with role ${role} is attempting a superadmin action at ${new Date().toISOString()}`
      );
      await this.restrictedSuperAdminOnlyAction.performSuperAdminAction(
        id,
        role
      );
      // Log successful action
      this.logger.info(
        `[Audit Log] Superadmin action performed by user ${id} and ${role} at ${new Date().toISOString()}`
      );
      // Log the superadmin action attempt
      res.status(200).json({ message: "Access Granted to superAdmin" });
    } catch (error: any) {
      this.logger.error(
        `[Audit Log] Error during superadmin action by user ${req.body.id} at ${new Date().toISOString()}: ${error.message}`
      );
      if (error instanceof SuperAdminOnlyError) {
        res.status(403).json({ message: "Access Denied: Super Admin Only!" });
      } else if (error instanceof UnauthorizedError) {
        res.status(401).json({ message: "Unathorized Attempt!" });
      } else {
        res.status(400).json({
          message: "Bad Request! You do not have the required permission!",
        }); // ** Handle unexpected errors ** //
      }
    }
    return {} as IAdmin[];
  }
}

export default {
  RoleAuthorizationMiddleware,
  Authorizations,
  SuperAdminController,
};
