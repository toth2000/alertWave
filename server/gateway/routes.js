const dotenv = require("dotenv");
dotenv.config;

const ALPHAVANTAGE_API_KEY = process.env.ALPHAVANTAGE_API_KEY;

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
    url: "/stock/search/:keyword",
    auth: true,
    proxy: {
      target: "https://www.alphavantage.co/query",
      changeOrigin: true,
      pathRewrite: (path, req) => {
        const { keyword } = req.params;
        return `/?function=SYMBOL_SEARCH&keywords=${keyword}&apikey=${ALPHAVANTAGE_API_KEY}`;
      },
    },
  },
];

module.exports = ROUTES;
