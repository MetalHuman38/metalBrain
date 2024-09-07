import { strict as assert } from "assert";
import dotenv from "dotenv";
import { load } from "ts-dotenv";

// ** Load the .env file into process.env ** //
dotenv.config();

const jwtENV = load({
  JWT_USER_SECRET: String,
  JWT_USER_EXPIRES_IN: Number,
  JWT_USER_ALGORITHM: String,
  JWT_USER_ISSUER: String,
  JWT_LOGIN_EXPIRES_IN: Number,
  JWT_COOKIE_NAME: String,
  JWT_COOKIE_EXPIRES_IN: String,
  JWT_COOKIE_SECURE: Boolean,
  JWT_COOKIE_HTTP_ONLY: Boolean,
  JWT_USER_MAX_AGE: Number,
  JWT_USER_REFRESH_SECRET: String,
  JWT_USER_REFRESH_EXPIRES_IN: Number,
  JWT_USER_REFRESH_ALGORITHM: String,
  JWT_USER_REFRESH_ISSUER: String,
  JWT_USER_REFRESH_MAX_AGE: Number,
  JWT_USER_REFRESH_COOKIE_EXPIRES_IN: String,
  JWT_USER_REFRESH_COOKIE_SECURE: Boolean,
  JWT_USER_REFRESH_COOKIE_HTTP_ONLY: Boolean,
  JWT_SIGN_OPTIONS: String,
});

// ** Assert that the environment variables are defined ** //
assert(jwtENV.JWT_USER_SECRET, "JWT User Secret is required");
assert(jwtENV.JWT_USER_EXPIRES_IN, "JWT User Expires In is required");
assert(jwtENV.JWT_USER_ALGORITHM, "JWT User Algorithm is required");
assert(jwtENV.JWT_USER_ISSUER, "JWT User Issuer is required");
assert(jwtENV.JWT_LOGIN_EXPIRES_IN, "JWT Login Max Age is required");
assert(jwtENV.JWT_COOKIE_NAME, "JWT Cookie Name is required");
assert(jwtENV.JWT_COOKIE_EXPIRES_IN, "JWT Cookie Expires In is required");
assert(jwtENV.JWT_COOKIE_SECURE, "JWT Cookie Secure is required");
assert(jwtENV.JWT_COOKIE_HTTP_ONLY, "JWT Cookie HTTP Only is required");
assert(jwtENV.JWT_USER_MAX_AGE, "JWT User Max Age is required");
assert(jwtENV.JWT_USER_REFRESH_SECRET, "JWT User Refresh Secret is required");
assert(
  jwtENV.JWT_USER_REFRESH_EXPIRES_IN,
  "JWT User Refresh Expires In is required"
);
assert(
  jwtENV.JWT_USER_REFRESH_ALGORITHM,
  "JWT User Refresh Algorithm is required"
);
assert(jwtENV.JWT_USER_REFRESH_ISSUER, "JWT User Refresh Issuer is required");
assert(jwtENV.JWT_USER_REFRESH_MAX_AGE, "JWT User Refresh Max Age is required");
assert(
  jwtENV.JWT_USER_REFRESH_COOKIE_EXPIRES_IN,
  "JWT User Refresh Cookie Expires In is required"
);
assert(
  jwtENV.JWT_USER_REFRESH_COOKIE_SECURE,
  "JWT User Refresh Cookie Secure is required"
);
assert(
  jwtENV.JWT_USER_REFRESH_COOKIE_HTTP_ONLY,
  "JWT User Refresh Cookie HTTP Only is required"
);
assert(jwtENV.JWT_SIGN_OPTIONS, "JWT Sign Options is required");

const {
  JWT_USER_SECRET,
  JWT_USER_EXPIRES_IN,
  JWT_USER_ALGORITHM,
  JWT_USER_ISSUER,
  JWT_LOGIN_EXPIRES_IN,
  JWT_COOKIE_NAME,
  JWT_COOKIE_EXPIRES_IN,
  JWT_COOKIE_SECURE,
  JWT_COOKIE_HTTP_ONLY,
  JWT_USER_MAX_AGE,
  JWT_USER_REFRESH_SECRET,
  JWT_USER_REFRESH_EXPIRES_IN,
  JWT_USER_REFRESH_ALGORITHM,
  JWT_USER_REFRESH_ISSUER,
  JWT_USER_REFRESH_MAX_AGE,
  JWT_USER_REFRESH_COOKIE_EXPIRES_IN,
  JWT_USER_REFRESH_COOKIE_SECURE,
  JWT_USER_REFRESH_COOKIE_HTTP_ONLY,
  JWT_SIGN_OPTIONS,
} = jwtENV;

export default {
  jwtENV,
  JWT_USER_SECRET,
  JWT_USER_EXPIRES_IN,
  JWT_USER_ALGORITHM,
  JWT_USER_ISSUER,
  JWT_LOGIN_EXPIRES_IN,
  JWT_COOKIE_NAME,
  JWT_COOKIE_EXPIRES_IN,
  JWT_COOKIE_SECURE,
  JWT_COOKIE_HTTP_ONLY,
  JWT_USER_MAX_AGE,
  JWT_USER_REFRESH_SECRET,
  JWT_USER_REFRESH_EXPIRES_IN,
  JWT_USER_REFRESH_ALGORITHM,
  JWT_USER_REFRESH_ISSUER,
  JWT_USER_REFRESH_MAX_AGE,
  JWT_USER_REFRESH_COOKIE_EXPIRES_IN,
  JWT_USER_REFRESH_COOKIE_SECURE,
  JWT_USER_REFRESH_COOKIE_HTTP_ONLY,
  JWT_SIGN_OPTIONS,
};
