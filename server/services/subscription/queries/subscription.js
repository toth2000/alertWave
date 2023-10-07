const TABLE_NAME = "subscription";

const getSubscriptionByUserId = (userId) => {
  return `SELECT * FROM ${TABLE_NAME} WHERE user_id = ${userId};`;
};

const getSubscriptionByUserIdAndStock = (userId, stock) => {
  return `SELECT * FROM ${TABLE_NAME} WHERE user_id = ${userId} AND stock = '${stock}';`;
};

const createSubscription = (userId, stock) => {
  return `INSERT INTO ${TABLE_NAME}(user_id, stock) VALUES (${userId},'${stock}');`;
};

const deleteSubscription = (userId, stock) => {
  return `DELETE FROM ${TABLE_NAME} WHERE user_id = ${userId} AND stock = '${stock}';`;
};

module.exports = {
  getSubscriptionByUserId,
  getSubscriptionByUserIdAndStock,
  createSubscription,
  deleteSubscription,
};
