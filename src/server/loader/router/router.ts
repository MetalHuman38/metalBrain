import express from "express";
import userRoutes from "./user/userRoutes.js";
import adminRoutes from "./admin/adminRoute.js";
import followRoutes from "./user/followRoutes.js";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send("Welcome to the API secure server");
});

// ** users route ** //
router.use("/api/", userRoutes);

// ** admin route ** //
router.use("/api", adminRoutes);

// ** follow route ** //
router.use("/api/", followRoutes);

export default router;
