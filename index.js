const express = require("express");
const jwt = require("jsonwebtoken");
const { isAuthenticated } = require("./helper");
const { verifyRefresh } = require("./helper");

const app = express();

app.use(express.json()); //for handling json data

app.get("/hello", (req, res) => {
  res.send("Hello world");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

app.post("/login", (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res
      .status(400)
      .json({ success: false, error: "enter valid credientials" });
  }
  const accessToken = jwt.sign({ email: email }, "accessSecret", {
    expiresIn: "2m",
  });
  const refreshToken = jwt.sign({ email: email }, "refreshSecret", {
    expiresIn: "10m",
  });
  //Ps. The expiresIn time is just for testing purpose you can    change it later accordingly.
  return res.status(200).json({ accessToken, refreshToken });
});

app.get("/protected", isAuthenticated, (req, res) => {
  res.json({ success: true, msg: "Welcome user!!", email: req.email });
});

app.post("/refresh", (req, res) => {
  const { email, refreshToken } = req.body;
  const isValid = verifyRefresh(email, refreshToken);
  if (!isValid) {
    return res
      .status(401)
      .json({ success: false, error: "Invalid token,try login again" });
  }
  const accessToken = jwt.sign({ email: email }, "accessSecret", {
    expiresIn: "2m",
  });
  return res.status(200).json({ success: true, accessToken });
});
