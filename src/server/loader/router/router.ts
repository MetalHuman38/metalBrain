import express from "express";
import userRoutes from "./user/userRoutes.js";
import adminRoutes from "./admin/adminRoute.js";
import followRoutes from "./user/followRoutes.js";
import uploadRoutes from "./upload/uploadRoutes.js";
import postRoutes from "./posts/postRoutes.js";
import commentRoutes from "./comments/commentRoutes.js";

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

// ** Image upload route ** //
router.use("/api", uploadRoutes);

// ** Post route ** //
router.use("/api", postRoutes);

// ** Comment route ** //
router.use("/api", commentRoutes);

export default router;
