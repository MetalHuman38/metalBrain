require('dotenv').config();

const databaseENV = {
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
  DB_NAME: process.env.DB_NAME,
  DB_HOST: process.env.DB_HOST,
};

module.exports = {
  development: {
    username: databaseENV.DB_USER,
    password: databaseENV.DB_PASS,
    database: databaseENV.DB_NAME,
    host: databaseENV.DB_HOST,
    dialect: 'mariadb',
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
};
