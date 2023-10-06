const createFcmTableEntry = (userId) => {
  return `INSERT INTO fcm_token(id) VALUES (${userId});`;
};

module.exports = { createFcmTableEntry };
