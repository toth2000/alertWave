const express = require("express");
const { loginUser, registerUser, refreshToken } = require("../controllers/auth");

const router = express.Router();

router.post("/login", loginUser);

router.post("/register", registerUser);

router.post("/refresh", refreshToken)

module.exports = router;
