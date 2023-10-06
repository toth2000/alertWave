const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

const { TOKEN_CONFIG } = require("../config/auth");
const { query } = require("./database");
const { updateUserRefreshToken } = require("../queries/user");

dotenv.config();

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_PRIVATE_KEY;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_PRIVATE_KEY;

const encryptPassword = async (password) => {
  const hash = await bcrypt.hash(password, TOKEN_CONFIG.token_salt_round);
  return hash;
};

const verifyPassword = async (password, hashPassword) => {
  const verified = await bcrypt.compare(password, hashPassword);
  return verified;
};

const jwtSign = async (userId) => {
  try {
    const authData = { userId };
    const refreshToken = jwt.sign(authData, REFRESH_TOKEN_SECRET, {
      expiresIn: TOKEN_CONFIG.refresh_token_expire_time,
    });

    const accessToken = jwt.sign(authData, ACCESS_TOKEN_SECRET, {
      expiresIn: TOKEN_CONFIG.access_token_expire_time,
    });

    await query(updateUserRefreshToken(userId, refreshToken));

    const response = { access_token: accessToken, refresh_token: refreshToken };

    return response;
  } catch (error) {
    console.error("Error generating refreshToken: ", error);
    return error;
  }
};

const jwtVerifyRefreshToken = (token) => {
  try {
    const decoded = jwt.decode(token, REFRESH_TOKEN_SECRET);
    return decoded;
  } catch (error) {
    console.error("Error in jwtVerifyRefreshToken: ", error);
    return error;
  }
};


const jwtCheckExpiry = (decodedToken) => {
  try {
    if (Date.now() >= decodedToken.exp * 1000) {
      // Expired
      return true;
    } else {
      // Still Valid
      return false;
    }
  } catch (error) {
    console.error("Error in jwtCheckExpiry: ", error);
    return true;
  }
};

module.exports = {
  encryptPassword,
  verifyPassword,
  jwtSign,
  jwtVerifyRefreshToken,
  jwtCheckExpiry,
};
