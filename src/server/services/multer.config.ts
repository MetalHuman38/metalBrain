import multer from "multer";
import path from "path";
import { validateMIMEType } from "validate-image-type";
import fs from "fs";
import imgENV from "../loader/config/imgENV.js";
import dotenv from "dotenv";

// ** Load the .env file into process.env ** //
dotenv.config();

// Define custom destination directory
const uploadDir = imgENV.UPLOAD_POST_IMAGE_PATH;
console.log("uploadDir:", uploadDir);

// Ensure the directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, uploadDir);
  },
  filename: function (_req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

// Check file type
const validateMimeType = async (file: any, cb: any) => {
  try {
    const validationResult = await validateMIMEType(file.path, {
      originalFilename: file.originalname,
      allowMimeTypes: ["image/jpeg", "image/png", "image/svg+xml"],
    });

    if (!validationResult.ok) {
      return cb(new Error("Invalid file type"));
    }
    cb(null, true);
  } catch (error) {
    console.error("Error validating file type:", error);
    cb(new Error("Error validating file type"));
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 },
  fileFilter: function (_req, file, cb) {
    const filetypes = /jpeg|jpg|png|svg/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    if (mimetype && extname) {
      return cb(null, true);
    }
    validateMimeType(file.path, cb);
  },
});

export default upload;
