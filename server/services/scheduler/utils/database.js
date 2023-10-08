const mysql = require("mysql2/promise");
const databaseConfig = require("../config/database");

const query = async (sql, params = null) => {
  const connection = await mysql.createPool(databaseConfig);
  const [results] = await connection.execute(sql, params);

  return results;
};

module.exports = {
  query,
};
