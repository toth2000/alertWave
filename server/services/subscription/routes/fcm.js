const express = require("express");
const { registerDevice } = require("../controller/fcm");

const router = express.Router();

router.post("/register", registerDevice);

module.exports = router;
