import { Sequelize } from "sequelize";
import databaseENV from "../config/databaseENV.js";
import fs from "fs";

// ** Database Configuration ** //
interface DBConfig {
  database: string;
  username: string;
  password: string;
  host: string;
  port: number;
  dialect: "mariadb";
  ssl: {
    ca: string;
    key: string;
    cert: string;
  };
}

// ** Database Connection ** //
const mariadb: DBConfig = {
  database: databaseENV.DB_NAME,
  username: databaseENV.DB_USER,
  password: databaseENV.DB_PASS,
  host: "localhost",
  port: databaseENV.DB_PORT,
  dialect: "mariadb",
  ssl: {
    ca: databaseENV.DB_SSL_CA,
    key: databaseENV.DB_SSL_KEY,
    cert: databaseENV.DB_SSL_CERT,
  },
};

export function sequelizeConInstance(): Sequelize {
  const sequelize = new Sequelize(
    mariadb.database,
    mariadb.username,
    mariadb.password,
    {
      host: mariadb.host,
      port: mariadb.port,
      dialect: mariadb.dialect,
      dialectOptions: {
        ssl: {
          ca: databaseENV.DB_SSL_CA
            ? fs.readFileSync(databaseENV.DB_SSL_CA).toString()
            : "",
          key: databaseENV.DB_SSL_KEY
            ? fs.readFileSync(databaseENV.DB_SSL_KEY).toString()
            : "",
          cert: databaseENV.DB_SSL_CERT
            ? fs.readFileSync(databaseENV.DB_SSL_CERT).toString()
            : "",
        },
      },
    },
  );
  return sequelize;
}
