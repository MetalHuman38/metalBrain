import multer from "multer";
import path from "path";
import fs from "fs";

// ** Ensure upload directory exists ** //
export const ensureDirectoryExists = (uploadDir: string) => {
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
};

// ** Configure Multer storage ** //
export const configureMulterStorage = (uploadDir: string) => {
  return multer.diskStorage({
    destination: (_req, _file, cb) => {
      cb(null, uploadDir);
    },
    filename: (_req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(
        null,
        file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
      );
    },
  });
};

// ** Factory function to create a Multer instance ** //
export const createMulterInstance = (
  storage: multer.StorageEngine,
  limits: any,
  fileFilter: any
) => {
  return multer({ storage, limits, fileFilter });
};

export default {
  ensureDirectoryExists,
  configureMulterStorage,
  createMulterInstance,
};
