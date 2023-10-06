const database = require("../utils/database");
const { validateKeys } = require("../utils/validate");
const { loginKeys, registerKeys, refreshTokenKeys } = require("../keys/auth");
const {
  verifyPassword,
  encryptPassword,
  jwtSign,
  jwtVerifyRefreshToken,
  jwtCheckExpiry,
} = require("../utils/auth");
const {
  getUserByEmail,
  insertIntoUserTable,
  getUserById,
} = require("../queries/user");
const { createFcmTableEntry } = require("../queries/fcm_token");

const loginUser = async (req, res) => {
  try {
    console.log("Req Body: ", req.body);
    if (!validateKeys(loginKeys, req.body)) {
      return res.status(400).json({
        message: "Please fill all the required fields",
        error: "Required Fields not passed",
      });
    }

    const { email, password } = req.body;

    const result = await database.query(getUserByEmail(email));

    const user = result[0];

    if (result.length === 0) {
      return res.status(404).json({
        message: "User does not exists, Please register to continue.",
        error: "Invalid email",
      });
    }

    const passwordVerified = await verifyPassword(password, user.password);

    if (!passwordVerified) {
      return res.status(401).json({
        message: "Incorrect Password",
        error: "Invalid Password",
      });
    }

    const { access_token, refresh_token } = await jwtSign(user.id);

    const { password: pass, ...other } = user;

    const response = {
      ...other,
      access_token,
      refresh_token,
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error("Error in login controller: ", error);
    res.status(500).json({
      message: "An error occured please try again later",
      error: error,
    });
  }
};

const registerUser = async (req, res) => {
  try {
    if (!validateKeys(registerKeys, req.body)) {
      return res.status(400).json({
        message: "Please fill all the required fields",
        error: "Required Fields not passed",
      });
    }

    const { name, email, password } = req.body;

    const hashPassword = await encryptPassword(password);

    const result = await database.query(
      insertIntoUserTable(name, email, hashPassword)
    );

    const { access_token, refresh_token } = await jwtSign(result.insertId);

    await database.query(createFcmTableEntry(result.insertId));

    const response = {
      name,
      id: result.insertId,
      email,
      access_token,
      refresh_token,
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error("Error Occured in register user controller: ", error);

    if (error?.errno === 1062) {
      res.status(500).json({ message: "User Already Exists", error: error });
    } else {
      res.status(500).json({
        message: "An error Occured, Please Try again Later.",
        error: error,
      });
    }
  }
};

const refreshToken = async (req, res) => {
  try {
    if (!validateKeys(refreshTokenKeys, req.body)) {
      return res.status(400).json({
        message: "Please fill all the required fields",
        error: "Required Fields not passed",
      });
    }

    const { refreshToken } = req.body;

    const decodedData = await jwtVerifyRefreshToken(refreshToken);

    if (jwtCheckExpiry(decodedData) === true) {
      return res.status(401).json({
        message: "Session Expired, Please login again.",
        refreshTokenExpired: true,
        error: "Refresh Token Expired",
      });
    }

    const result = await database.query(getUserById(decodedData.userId));

    if (result.length === 0) {
      return res.status(404).json({
        message: "User does not exists, Please register to continue.",
        error: "Invalid email",
      });
    }

    const user = result[0];

    if (user.refresh_token !== refreshToken) {
      return res.status(401).json({
        message: "Invalid Token",
        error: "Invalid token",
      });
    }

    const { access_token, refresh_token } = await jwtSign(decodedData.userId);

    const { password, ...other } = user;

    const response = { ...other, access_token, refresh_token };

    return res.status(200).json(response);
  } catch (error) {
    console.error("Error in Refresh Token Handler: ", error);
    return res.status(500).json({
      message: "An error occured, please try again later.",
      error: error,
    });
  }
};

module.exports = { loginUser, registerUser, refreshToken };
