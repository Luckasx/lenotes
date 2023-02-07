const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const usersController = require("../controllers/users.controller");

const jwt_helper = require("../_helpers/jwt_helper");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/:username", async (req, res) => {
  let result = await usersController.get(req.params.username);

  res.status(result.status || 200).json(result);
});

app.post("/", async (req, res) => {
  let result = await usersController.create(req.body.data);

  res.status(result.status || 200).json(result);
});

app.post("/login", async (req, res) => {
  let result = await usersController.login(req.body.data);

  if (result.data.username) {
    const token = await jwt_helper.sign(result.data);
    res.cookie("token", token, { httpOnly: true, secure: true }).status(result.status || 200).json(result.data);
    return;
  }

  result.status = 401;

  res.status(result.status || 200).json(result.data);
 
});

module.exports = app;
