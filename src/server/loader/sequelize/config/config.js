require('dotenv').config();

const mariadb = {
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
  DB_NAME: process.env.DB_NAME,
  DB_PORT: process.env.DB_PORT,
}

export const development = {
  username: mariadb.DB_USER,
  password: mariadb.DB_PASS,
  database: mariadb.DB_NAME,
  host: mariadb.DB_HOST,
  port: mariadb.DB_PORT,
  dialect: 'mariadb',
  migrationStorageTableName: "sequelize",
};
export const test = {
  username: mariadb.DB_USER,
  password: mariadb.DB_PASSWORD,
  database: mariadb.DB_NAME,
  host: mariadb.DB_HOST,
  port: mariadb.DB_PORT,
  dialect: 'mariadb'
};
export const production = {
  username: mariadb.DB_USER,
  password: mariadb.DB_PASSWORD,
  database: mariadb.DB_NAME,
  host: mariadb.DB_HOST,
  port: mariadb.DB_PORT,
  dialect: 'mariadb'
};