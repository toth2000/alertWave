const ROUTES = [
  {
    url: "/auth",
    auth: false,
    proxy: {
      target: "http://localhost:7672",
      changeOrigin: true,
      pathRewrite: {
        "^/auth": "/", // rewrite path
      },
    },
  },
  {
    url: "/notification",
    auth: true,
    proxy: {
      target: "http://localhost:7673",
      changeOrigin: true,
      pathRewrite: {
        "^/notification": "/", // rewrite path
      },
    },
  },
];

module.exports = ROUTES;
