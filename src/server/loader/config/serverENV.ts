import { strict as assert } from "assert";
import dotenv from "dotenv";
import { load } from "ts-dotenv";

// ** Load the .env file into process.env ** //
dotenv.config();

// ** Load server environment variables ** //
const serverENV = load({
  PORT: Number,
  SSL_PORT: Number,
  NODE_ENV: ["development", "production", "test"],
  MORGAN: ["combined", "dev", "tiny"],
  TRUST_PROXY: String,
  NUMBER_OF_PROXIES: Number,
  IDLE_TIMEOUT: Number,
  COMPRESSION_LEVEL: Number,
  COMPRESSION_THRESHOLD: Number,
  NODE_SSL: Boolean,
  NODE_SSL_KEY: String,
  NODE_SSL_CERT: String,
  NODE_SSL_CA: String,
});

// ** Assert that the server environment variables are defined ** //
assert(serverENV.PORT, "PORT is required");
assert(serverENV.SSL_PORT, "SSL_PORT is required");
assert(serverENV.NODE_ENV, "NODE_ENV is required");
assert(serverENV.MORGAN, "MORGAN is required");
assert(serverENV.TRUST_PROXY, "TRUST_PROXY is required");
assert(serverENV.NUMBER_OF_PROXIES, "NUMBER_OF_PROXIES is required");
assert(serverENV.IDLE_TIMEOUT, "IDLE_TIMEOUT is required");
assert(serverENV.COMPRESSION_LEVEL, "COMPRESSION_LEVEL is required");
assert(serverENV.COMPRESSION_THRESHOLD, "COMPRESSION_THRESHOLD is required");
assert(serverENV.NODE_SSL, "NODE_SSL is required");
assert(serverENV.NODE_SSL_KEY, "NODE_SSL_KEY is required");
assert(serverENV.NODE_SSL_CERT, "NODE_SSL_CERT is required");
assert(serverENV.NODE_SSL_CA, "NODE_SSL_CA is required");

const {
  PORT,
  SSL_PORT,
  NODE_ENV,
  MORGAN,
  TRUST_PROXY,
  NUMBER_OF_PROXIES,
  IDLE_TIMEOUT,
  COMPRESSION_LEVEL,
  COMPRESSION_THRESHOLD,
  NODE_SSL,
  NODE_SSL_KEY,
  NODE_SSL_CERT,
  NODE_SSL_CA,
} = serverENV;

export default {
  serverENV,
  PORT,
  SSL_PORT,
  NODE_ENV,
  MORGAN,
  TRUST_PROXY,
  NUMBER_OF_PROXIES,
  IDLE_TIMEOUT,
  COMPRESSION_LEVEL,
  COMPRESSION_THRESHOLD,
  NODE_SSL,
  NODE_SSL_KEY,
  NODE_SSL_CERT,
  NODE_SSL_CA,
};
