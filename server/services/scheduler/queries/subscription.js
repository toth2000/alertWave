const getSubscriptionListWithFcmToken = () => {
  return `SELECT user_id, stock, token 
  FROM fcm_token INNER 
  JOIN subscription 
  ON 
  subscription.user_id = fcm_token.id 
  ORDER BY subscription.stock;`;
};

module.exports = { getSubscriptionListWithFcmToken };
