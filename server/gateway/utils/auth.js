const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_PRIVATE_KEY;

const jwtVerifyAccessToken = (token) => {
  try {
    const decoded = jwt.decode(token, ACCESS_TOKEN_SECRET);
    return decoded;
  } catch (error) {
    console.error("Error in jwtVerifyAccessToken: ", error);
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
  } catch (error) {}
};

const getHeaderToken = (req) => {
  try {
    const { token } = req.headers;
    const acessToken = token.split(" ")[1];
    return acessToken;
  } catch (error) {
    console.error("Header not provided", error);
    return null;
  }
};

module.exports = { jwtVerifyAccessToken, jwtCheckExpiry, getHeaderToken };
