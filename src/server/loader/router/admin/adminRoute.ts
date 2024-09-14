import express from "express";
import {
  AdminPromoteUseCase,
  RestrictedSuperAdminActionUseCase,
} from "../../admin/AdminUseCase.js";
import { SequelizeAdminRepo } from "../../admin/SequelizeAdminRepo.js";
import {
  Authorizations,
  RoleAuthorizationMiddleware,
} from "../../controller/admin/adminAuthenticator.js";
import { SuperAdminController } from "../../controller/admin/adminAuthenticator.js";
import { WinstonLogger } from "../../../services/logger.js";

const router = express.Router();

// Set up dependencies
const adminRepo = new SequelizeAdminRepo();
const roleAuthorizationMiddleware = new RoleAuthorizationMiddleware();
const adminPromoteUseCase = new AdminPromoteUseCase(adminRepo);
const restrictedAction = new RestrictedSuperAdminActionUseCase(adminRepo);
const logger = new WinstonLogger();
const authorizations = new Authorizations(adminPromoteUseCase, logger);
const superAdminController = new SuperAdminController(restrictedAction, logger);

router.get(
  "/protected",
  (req, res, next) => roleAuthorizationMiddleware.handle(req, res, next),
  (req, res) => superAdminController.restrictedSuperAdminAction(req, res)
);

// ** Promote to superadmin. Method should update roles dynamically and manage admin permissions efficiently ** //
router.post("/promote", (req, res) =>
  authorizations.promoteToSuperAdmin(req, res)
);

export default router;
