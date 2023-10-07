const dotenv = require("dotenv");
dotenv.config();

const databaseConfig = {
  host: "db4free.net",
  port: "3306",
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
};

module.exports = databaseConfig;
