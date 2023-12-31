const {
  getHeaderToken,
  jwtCheckExpiry,
  jwtVerifyAccessToken,
} = require("../utils/auth");

const verifyTokenMiddleware = (req, res, next) => {
  try {
    const accessToken = getHeaderToken(req);

    if (!accessToken) {
      res.status(400).json({
        message: "Login to continue",
        error: "Access Token not provided",
      });
      return;
    }

    const decodedData = jwtVerifyAccessToken(accessToken);
    const tokenExpired = jwtCheckExpiry(decodedData);

    if (tokenExpired) {
      res
        .status(401)
        .json({
          message: "An error occured, please try again.",
          accessTokenExpired: true,
          error: "Access Token Expired",
        });
      return;
    }
    req.user = decodedData;
    next();
  } catch (error) {
    console.error("Auth middleware error: ", error);
    res.status(500).json({
      message: "An error occured, please try again later.",
      error: error,
    });
  }
};

module.exports = { verifyTokenMiddleware };
