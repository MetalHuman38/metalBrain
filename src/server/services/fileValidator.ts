import path from "path";
import { validateMIMEType } from "validate-image-type";

// Validate the file type
export const validateMimeType = async (
  file: any,
  allowedTypes: string[],
  cb: any
) => {
  try {
    const validationResult = await validateMIMEType(file.path, {
      originalFilename: file.originalname,
      allowMimeTypes: allowedTypes,
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

// Filter function for Multer to check file type
export const fileFilter = (
  allowedFileTypes: string[],
  allowedExtensions: string[]
) => {
  return function (_req: any, file: any, cb: any) {
    const filetypes = new RegExp(allowedFileTypes.join("|"));
    const extname = new RegExp(allowedExtensions.join("|")).test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    }
    validateMimeType(file.path, allowedFileTypes, cb);
  };
};

export default {
  validateMimeType,
  fileFilter,
};
