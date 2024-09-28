import express from "express";
import {
  AdminPromoteUseCase,
  CreateAdminUseCase,
  RestrictedSuperAdminActionUseCase,
} from "../../admin/AdminUseCase.js";
import { SequelizeAdminRepo } from "../../admin/SequelizeAdminRepo.js";
import {
  AdminController,
  Authorizations,
  RoleAuthorizationMiddleware,
} from "../../controller/admin/adminAuthenticator.js";
import { SuperAdminController } from "../../controller/admin/adminAuthenticator.js";
import { WinstonLogger } from "../../../services/logger.js";
import { BcryptPasswordHandler } from "../../../services/bcryptPasswordHandler.js";
import { JwtTokenService } from "../../../services/jwtTokenService.js";

const router = express.Router();

// Set up dependencies
const adminRepo = new SequelizeAdminRepo();
const passwordHasher = new BcryptPasswordHandler();
const logger = new WinstonLogger();
const jwtHandler = new JwtTokenService();

// ** Initialize dependencies ** //
const roleAuthorizationMiddleware = new RoleAuthorizationMiddleware();
const adminPromoteUseCase = new AdminPromoteUseCase(adminRepo);
const restrictedAction = new RestrictedSuperAdminActionUseCase(adminRepo);
const authorizations = new Authorizations(adminPromoteUseCase, logger);
const superAdminController = new SuperAdminController(restrictedAction, logger);

const createAdminUseCase = new CreateAdminUseCase(
  adminRepo,
  passwordHasher,
  jwtHandler
);
const adminController = new AdminController(createAdminUseCase, logger);

// ** Create Admin ** //
router.post(
  "/create",
  (req, res, next) => roleAuthorizationMiddleware.handle(req, res, next),
  (req, res) => adminController.createAdmin(req, res)
);

// ** Role Authorization Middleware ** //
router.get(
  "/protected",
  (req, res, next) => roleAuthorizationMiddleware.handle(req, res, next),
  (req, res) => superAdminController.restrictedSuperAdminAction(req, res)
);

// ** Promote to superadmin. Method should update roles dynamically and manage admin permissions efficiently ** //
router.put(
  "/promote",
  (req, res, next) => roleAuthorizationMiddleware.handle(req, res, next),
  (req, res) => authorizations.promoteToSuperAdmin(req, res)
);

export default router;
