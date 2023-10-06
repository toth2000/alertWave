const morgan = require("morgan");

const logging = (app) => {
  app.use(morgan("combined"));
};

module.exports = logging;
