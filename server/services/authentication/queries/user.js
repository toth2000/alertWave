const TABLE_NAME = "user";

const getUserById = (userId) => {
  return `SELECT * FROM ${TABLE_NAME} WHERE id = '${userId}';`;
};

const getUserByEmail = (email) => {
  return `SELECT * FROM ${TABLE_NAME} WHERE email = '${email}';`;
};

const insertIntoUserTable = (name, email, password) => {
  return `INSERT INTO ${TABLE_NAME}(name,email,password) VALUES ('${name}','${email}','${password}');`;
};

const updateUserRefreshToken = (userId, refreshToken) => {
  return `UPDATE ${TABLE_NAME} SET refresh_token = '${refreshToken}' WHERE id = ${userId};`;
};

module.exports = {
  getUserById,
  getUserByEmail,
  insertIntoUserTable,
  updateUserRefreshToken,
};
