const database = require("../utils/database");
const { validateKeys } = require("../utils/validate");
const {
  getSubscriptionKeys,
  subscriptionKeys,
} = require("../keys/subscription");
const {
  getSubscriptionByUserIdAndStock,
  createSubscription,
  deleteSubscription,
  getSubscriptionByUserId,
} = require("../queries/subscription");

const getUserSubscription = async (req, res) => {
  try {
    if (!validateKeys(getSubscriptionKeys, req.params)) {
      return res.status(400).json({
        message: "Please fill all the required fields",
        error: "Required Fields not passed",
      });
    }

    const { userId } = req.params;
    const result = await database.query(getSubscriptionByUserId(userId));

    return res.status(200).json(result);
  } catch (error) {
    console.error("Error Occured in get subscription controller: ", error);
    return res.status(500).json({
      message: "An error Occured, Please Try again Later.",
      error: error,
    });
  }
};

const createUserSubscription = async (req, res) => {
  try {
    if (!validateKeys(subscriptionKeys, req.body)) {
      return res.status(400).json({
        message: "Please fill all the required fields",
        error: "Required Fields not passed",
      });
    }

    const { userId, stock } = req.body;

    const result = await database.query(
      getSubscriptionByUserIdAndStock(userId, stock)
    );

    if (result.length !== 0) {
      return res.status(404).json({
        message: "You have already subscribed to the stock.",
        error: "Already Subscribed",
      });
    }

    await database.query(createSubscription(userId, stock));

    return res.status(201).json({
      message: "Subscription Created",
      result: true,
    });
  } catch (error) {
    console.error("Error Occured in create subscription controller: ", error);
    res.status(500).json({
      message: "An error Occured, Please Try again Later.",
      error: error,
    });
  }
};

const deleteUserSubscription = async (req, res) => {
  try {
    if (!validateKeys(subscriptionKeys, req.body)) {
      return res.status(400).json({
        message: "Please fill all the required fields",
        error: "Required Fields not passed",
      });
    }

    const { userId, stock } = req.body;

    const result = await database.query(
      getSubscriptionByUserIdAndStock(userId, stock)
    );

    if (result.length === 0) {
      return res.status(404).json({
        message: "You have not subscribed to this stock.",
        error: "Subscription not found",
      });
    }

    await database.query(deleteSubscription(userId, stock));

    return res.status(201).json({
      message: "Subscription Deleted",
      result: true,
    });
  } catch (error) {
    console.error("Error Occured in delete subscription controller: ", error);
    res.status(500).json({
      message: "An error Occured, Please Try again Later.",
      error: error,
    });
  }
};

module.exports = {
  getUserSubscription,
  createUserSubscription,
  deleteUserSubscription,
};
