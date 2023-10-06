const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const authRoute = require("./routes/auth");

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Authentication Service is running");
});


app.use("/", authRoute);

app.listen(PORT, () => {
  console.log("Alert Wave Authentication Service is running at port: ", PORT);
});
