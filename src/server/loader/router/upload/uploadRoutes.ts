import { Router } from "express";
import { UploadController } from "../../controller/upload/uploadImage.js";
import { UploadImageUseCase } from "../../userrepo/upload/UploadImageUseCase.js";
import { SequelizeImageUpload } from "../../userrepo/upload/SequelizeImageRepo.js";
import upload from "../../../services/multer.config.js";
import { VerifyUserUseCase } from "../../userrepo/userUseCases.js";
import { SequelizeUserRepo } from "../../userrepo/sequelizeUserRepo.js";
import { JwtTokenService } from "../../../services/jwtTokenService.js";

const router = Router();

// ** Initialize dependencies ** //
const userRepository = new SequelizeUserRepo();
const jwtHandler = new JwtTokenService();

const uploadImageRepo = new SequelizeImageUpload();
const uploadImageUseCase = new UploadImageUseCase(uploadImageRepo);
const verifyUserUseCase = new VerifyUserUseCase(userRepository, jwtHandler);
const uploadController = new UploadController(
  uploadImageUseCase,
  verifyUserUseCase
);

// ** Upload Images ** //
router.post("/upload", upload.single("image"), (req, res) =>
  uploadController.uploadImages(req, res)
);

// ** Delete Image ** //
router.delete("/delete", (req, res) => uploadController.deleteImage(req, res));

export default router;
