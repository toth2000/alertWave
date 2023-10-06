const express = require("express");
const dotnev = require("dotenv");
const cors = require("cors");

const logging = require("./utils/logging");
const ROUTES = require("./routes");
const proxies = require("./utils/proxy");

const app = express();
dotnev.config();

app.use(cors());

logging(app);
proxies(app, ROUTES);

const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Alert Wave API gateway is running");
});

app.listen(port, () => {
  console.log("Alert Wave API Gateway running in port: ", port);
});
