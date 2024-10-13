import dotenv from "dotenv";

// ** Load the .env file into process.env ** //
dotenv.config();

export const uploadConfig = {
  postImage: {
    path: process.env.UPLOAD_POST_IMAGE_PATH || "/assets/images",
    allowedFileTypes: ["image/jpeg", "image/png", "image/svg+xml"],
    allowedExtensions: ["jpeg", "jpg", "png", "svg"],
    limits: {
      fileSize: 10 * 1024 * 1024,
    },
    video: {
      path: process.env.UPLOAD_POST_VIDEO_PATH || "uploads/videos",
      allowedFileTypes: ["video/mp4", "video/quicktime"],
      allowedExtensions: ["mp4", "mov"],
      limits: {
        fileSize: 100 * 1024 * 1024,
      },
    },
  },
};

export default uploadConfig;
