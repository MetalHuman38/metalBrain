import type { Express } from "express";
import expressloader from "./express.js";
import { waitForDBConnection } from "./sequelize/mariadb.js";

// ** Load the express app ** //
export default async function ({ app }: { app: Express }) {
  await expressloader({ app });
  await waitForDBConnection();
  console.log("Express Server Initialized");
  return app;
}
