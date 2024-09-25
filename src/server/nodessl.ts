import fs from "fs";
import serverENV from "./loader/config/serverENV.js";

export class NodeSSL {
  NODE_SSL: boolean;
  NODE_SSL_KEY: string;
  NODE_SSL_CERT: string;
  NODE_SSL_CA: string;

  constructor() {
    this.NODE_SSL = String(serverENV.NODE_SSL) === "true"; // Convert string to boolean
    this.NODE_SSL_KEY = serverENV.NODE_SSL_KEY || ""; // Private key path
    this.NODE_SSL_CERT = serverENV.NODE_SSL_CERT || ""; // Certificate path
    this.NODE_SSL_CA = serverENV.NODE_SSL_CA || ""; // CA bundle path (optional)
  }

  // Method to load SSL options
  loadSSLOptions() {
    if (this.NODE_SSL) {
      return {
        key: fs.readFileSync(this.NODE_SSL_KEY), // Load private key
        cert: fs.readFileSync(this.NODE_SSL_CERT), // Load certificate
        ca: this.NODE_SSL_CA ? fs.readFileSync(this.NODE_SSL_CA) : undefined, // Load CA if available
      };
    } else {
      throw new Error(
        "SSL is not enabled. Check your environment configuration."
      );
    }
  }
}

export default {
  NodeSSL,
};
