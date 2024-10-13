import { strict as assert } from "assert";
import dotenv from "dotenv";
import { load } from "ts-dotenv";

// ** Load the .env file into process.env ** //
dotenv.config();

const imgENV = load({
  UPLOAD_POST_IMAGE_PATH: String,
  UPLOAD_STORIES_IMAGE_PATH: String,
  UPLOAD_PROFILE_IMAGE_PATH: String,
  UPLOAD_POST_VIDEO_PATH: String,
  ALLOWED_IMAGE_TYPES: String,
  IMG_MAX_SIZE: Number,
  IMG_ALLOW_MIME_TYPES: String,
  IMG_MAX_AGE: Number,
});

// ** Assert that the environment variables are defined ** //
assert(imgENV.UPLOAD_POST_IMAGE_PATH, "Image Upload Directory is required");
assert(imgENV.UPLOAD_STORIES_IMAGE_PATH, "Image Upload Directory is required");
assert(imgENV.UPLOAD_PROFILE_IMAGE_PATH, "Image Upload Directory is required");
assert(imgENV.ALLOWED_IMAGE_TYPES, "Allowed Image Types is required");
assert(imgENV.IMG_MAX_SIZE, "Image Max Size is required");
assert(imgENV.IMG_ALLOW_MIME_TYPES, "Image Allow Mime Types is required");
assert(imgENV.IMG_MAX_AGE, "Image Max Age is required");
assert(imgENV.UPLOAD_POST_VIDEO_PATH, "Video Upload Directory is required");

// ** Desstruct the environment variables ** //
const {
  UPLOAD_POST_IMAGE_PATH,
  UPLOAD_STORIES_IMAGE_PATH,
  UPLOAD_PROFILE_IMAGE_PATH,
  ALLOWED_IMAGE_TYPES,
  IMG_MAX_SIZE,
  IMG_ALLOW_MIME_TYPES,
  IMG_MAX_AGE,
  UPLOAD_POST_VIDEO_PATH,
} = imgENV;

export default {
  imgENV,
  UPLOAD_POST_IMAGE_PATH,
  UPLOAD_STORIES_IMAGE_PATH,
  UPLOAD_PROFILE_IMAGE_PATH,
  ALLOWED_IMAGE_TYPES,
  IMG_MAX_SIZE,
  IMG_ALLOW_MIME_TYPES,
  IMG_MAX_AGE,
  UPLOAD_POST_VIDEO_PATH,
};
