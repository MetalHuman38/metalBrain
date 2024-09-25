import { strict as assert } from "assert";
import dotenv from "dotenv";
import { load } from "ts-dotenv";

// ** Load the .env file into process.env ** //
dotenv.config();

// ** Load smpt environment variables ** //
const smtpENV = load({
  SMTP_HOST: String,
  SMTP_PORT: Number,
  SMTP_USER: String,
  SMTP_PASS: String,
  SMTP_SSL_CA: String,
  SMTP_SSL_KEY: String,
  SMTP_SSL_CERT: String,
  SMTP_SECURE: Boolean,
  SMTP_TLS_CIPHERS: String,
  SMTP_REQUIRE_TLS: Boolean,
  SMTP_DEBUG: Boolean,
  CLIENT_URL: String,
  JWT_EMAIL_SECRET: String,
  JWT_EMAIL_EXPIRES_IN: Number,
  JWT_EMAIL_ALGORITHM: String,
  JWT_EMAIL_ISSUER: String,
  JWT_EMAIL_COOKIE_NAME: String,
  JWT_EMAIL_COOKIE_EXPIRES_IN: String,
});

// ** Assert that the smpt environment variables are defined ** //
assert(smtpENV.SMTP_HOST, "SMTP_HOST is required");
assert(smtpENV.SMTP_PORT, "SMTP_PORT is required");
assert(smtpENV.SMTP_USER, "SMTP_USER is required");
assert(smtpENV.SMTP_PASS, "SMTP_PASS is required");
assert(smtpENV.SMTP_SSL_CA, "SMTP_SSL_CA is required");
assert(smtpENV.SMTP_SSL_KEY, "SMTP_SSL_KEY is required");
assert(smtpENV.SMTP_SSL_CERT, "SMTP_SSL_CERT is required");
assert(smtpENV.SMTP_SECURE, "SMTP_SECURE is required");
assert(smtpENV.SMTP_TLS_CIPHERS, "SMTP_TLS_CIPHERS is required");
assert(smtpENV.SMTP_REQUIRE_TLS, "SMTP_REQUIRE_TLS is required");
assert(smtpENV.SMTP_DEBUG, "SMTP_DEBUG is required");
assert(smtpENV.JWT_EMAIL_SECRET, "JWT_EMAIL is required");
assert(smtpENV.JWT_EMAIL_EXPIRES_IN, "JWT_EMAIL_EXPIRES_IN is required");
assert(smtpENV.JWT_EMAIL_ALGORITHM, "JWT_EMAIL_ALGORITHM is required");
assert(smtpENV.JWT_EMAIL_ISSUER, "JWT_EMAIL_ISSUER is required");
assert(smtpENV.JWT_EMAIL_COOKIE_NAME, "JWT_EMAIL_COOKIE_NAME is required");
assert(
  smtpENV.JWT_EMAIL_COOKIE_EXPIRES_IN,
  "JWT_EMAIL_COOKIE_EXPIRES_IN is required"
);
assert(smtpENV.CLIENT_URL, "CLIENT_URL is required");

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  SMTP_SSL_CA,
  SMTP_SSL_KEY,
  SMTP_SSL_CERT,
  SMTP_SECURE,
  SMTP_TLS_CIPHERS,
  SMTP_REQUIRE_TLS,
  SMTP_DEBUG,
  JWT_EMAIL_SECRET,
  JWT_EMAIL_EXPIRES_IN,
  JWT_EMAIL_ALGORITHM,
  JWT_EMAIL_ISSUER,
  JWT_EMAIL_COOKIE_NAME,
  JWT_EMAIL_COOKIE_EXPIRES_IN,
  CLIENT_URL,
} = smtpENV;

export default {
  smtpENV,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  SMTP_SSL_CA,
  SMTP_SSL_KEY,
  SMTP_SSL_CERT,
  SMTP_SECURE,
  SMTP_TLS_CIPHERS,
  SMTP_REQUIRE_TLS,
  SMTP_DEBUG,
  JWT_EMAIL_SECRET,
  JWT_EMAIL_EXPIRES_IN,
  JWT_EMAIL_ALGORITHM,
  JWT_EMAIL_ISSUER,
  JWT_EMAIL_COOKIE_NAME,
  JWT_EMAIL_COOKIE_EXPIRES_IN,
  CLIENT_URL,
};
