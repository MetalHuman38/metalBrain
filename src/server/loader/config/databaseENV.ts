import { strict as assert } from "assert";
import dotenv from "dotenv";
import { load } from "ts-dotenv";

// ** Load the .env file into process.env ** //
dotenv.config();

// ** Load database environment variables ** //
const databaseENV = load({
  DB_NAME: String,
  DB_USER: String,
  DB_PASS: String,
  DB_PORT: Number,
  DB_SSL_CA: String,
  DB_SSL_KEY: String,
  DB_SSL_CERT: String,
});

// ** Assert that the environment variables are defined ** //
assert(databaseENV.DB_NAME, "DB_NAME is required");
assert(databaseENV.DB_USER, "DB_USER is required");
assert(databaseENV.DB_PASS, "DB_PASS is required");
assert(databaseENV.DB_PORT, "DB_PORT is required");
assert(databaseENV.DB_SSL_CA, "DB_SSL_CA is required");
assert(databaseENV.DB_SSL_KEY, "DB_SSL_KEY is required");
assert(databaseENV.DB_SSL_CERT, "DB_SSL_CERT is required");

const {
  DB_NAME,
  DB_USER,
  DB_PASS,
  DB_PORT,
  DB_SSL_CA,
  DB_SSL_KEY,
  DB_SSL_CERT,
} = databaseENV;

export default {
  databaseENV,
  DB_NAME,
  DB_USER,
  DB_PASS,
  DB_PORT,
  DB_SSL_CA,
  DB_SSL_KEY,
  DB_SSL_CERT,
};
