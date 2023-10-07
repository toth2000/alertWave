const express = require("express");

const {
  getUserSubscription,
  createUserSubscription,
  deleteUserSubscription,
} = require("../controller/subscription");

const router = express.Router();

router.get("/:userId", getUserSubscription);

router.post("/create", createUserSubscription);

router.post("/delete", deleteUserSubscription);

module.exports = router;
