import { Sequelize } from "sequelize";
import { sequelizeConInstance } from "./sequelizeCon.js";

// ** Database Connection ** //
export async function waitForDBConnection(): Promise<Sequelize> {
  const sequelize = sequelizeConInstance();
  const delay = 5000;
  const maxRetries = 10;
  let retries = 0;
  while (retries < maxRetries) {
    try {
      await sequelize.authenticate();
      await sequelize.sync({ force: true });
      console.log("Connection has been established successfully.");
      return sequelize;
    } catch (error) {
      console.error("Unable to connect to the database:", error);
      retries++;
      console.log(`Retrying in ${delay / 1000} seconds...`);
      await new Promise((res) => setTimeout(res, delay));
    } finally {
      if (retries === maxRetries) {
        throw new Error("Unable to connect to the database");
      }
    }
    if (!sequelize) {
      throw new Error("Unable to connect to the database");
    } else {
      return sequelize;
    }
  }
  return sequelize;
}
