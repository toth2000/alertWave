const { createProxyMiddleware } = require("http-proxy-middleware");

const proxies = (app, routes) => {
  routes.forEach((item) => {
    app.use(item.url, createProxyMiddleware(item.proxy));
  });
};

module.exports = proxies;
