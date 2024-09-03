import express from "express";
import userRoutes from "./user/userRoutes.js";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send("Hello World");
});

router.use("/api/users", userRoutes);

export default router;
