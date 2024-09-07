import express from "express";
import userRoutes from "./user/userRoutes.js";
import adminRoutes from "./admin/adminRoute.js";

const router = express.Router();

// ** users route ** //
router.use("/api/users", userRoutes);

// ** admin route ** //
router.use("/api/admin", adminRoutes);

export default router;
