const { createProxyMiddleware } = require("http-proxy-middleware");
const { verifyTokenMiddleware } = require("../middleware/auth");

const proxies = (app, routes) => {
  routes.forEach((item) => {
    if (item.auth === true) {
      app.use(
        item.url,
        verifyTokenMiddleware,
        createProxyMiddleware(item.proxy)
      );
    } else {
      app.use(item.url, createProxyMiddleware(item.proxy));
    }
  });
};

module.exports = proxies;
