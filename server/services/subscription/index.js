const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const subscriptionRoute = require("./routes/subscription");
const fmcRoute = require("./routes/fcm");

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Subscription Service is running");
});

app.use("/", subscriptionRoute);
app.use("/fcm", fmcRoute);

app.listen(PORT, () => {
  console.log("Alert Wave Subscription Service is running at port: ", PORT);
});
