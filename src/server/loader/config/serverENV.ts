import { strict as assert } from "assert";
import dotenv from "dotenv";
import { load } from "ts-dotenv";

// ** Load the .env file into process.env ** //
dotenv.config();

// ** Load server environment variables ** //
const serverENV = load({
  PORT: Number,
  NODE_ENV: ["development", "production", "test"],
  MORGAN: ["combined", "dev", "tiny"],
  TRUST_PROXY: String,
  NUMBER_OF_PROXIES: Number,
  IDLE_TIMEOUT: Number,
  COMPRESSION_LEVEL: Number,
  COMPRESSION_THRESHOLD: Number,
});

// ** Assert that the server environment variables are defined ** //
assert(serverENV.PORT, "PORT is required");
assert(serverENV.NODE_ENV, "NODE_ENV is required");
assert(serverENV.MORGAN, "MORGAN is required");
assert(serverENV.TRUST_PROXY, "TRUST_PROXY is required");
assert(serverENV.NUMBER_OF_PROXIES, "NUMBER_OF_PROXIES is required");
assert(serverENV.IDLE_TIMEOUT, "IDLE_TIMEOUT is required");
assert(serverENV.COMPRESSION_LEVEL, "COMPRESSION_LEVEL is required");
assert(serverENV.COMPRESSION_THRESHOLD, "COMPRESSION_THRESHOLD is required");

const {
  PORT,
  NODE_ENV,
  MORGAN,
  TRUST_PROXY,
  NUMBER_OF_PROXIES,
  IDLE_TIMEOUT,
  COMPRESSION_LEVEL,
  COMPRESSION_THRESHOLD,
} = serverENV;

export default {
  serverENV,
  PORT,
  NODE_ENV,
  MORGAN,
  TRUST_PROXY,
  NUMBER_OF_PROXIES,
  IDLE_TIMEOUT,
  COMPRESSION_LEVEL,
  COMPRESSION_THRESHOLD,
};
