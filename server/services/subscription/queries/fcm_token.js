const TABLE_NAME = "fcm_token";

const updateFcmTableEntry = (userId, fcmToken) => {
  return `UPDATE ${TABLE_NAME} SET token = '${fcmToken}' WHERE id = ${userId};`;
};

module.exports = { updateFcmTableEntry };
