const ROUTES = [
  {
    url: "/auth",
    proxy: {
      target: "https://www.google.com",
      changeOrigin: true,
    },
  },
  {
    url: "/notification",
    proxy: {
      target: "http://localhost:8000/",
      changeOrigin: true,
    },
  },
];

module.exports = ROUTES;
