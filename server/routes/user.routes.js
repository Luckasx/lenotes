// !!! https://dev.to/cyberwolves/jwt-authentication-with-access-tokens-refresh-tokens-in-node-js-5aa9
const { Router } = require("express");
const usersController = require("../controllers/users.controller");

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

const router = Router();

router.post("/refreshtoken", async (req, res) => {
  usersController.refresh(req, res);
});

router.post("/login", async (req, res) => {
  usersController.login(req, res);
});

router.get("/:username", async (req, res) => {
  let result = await usersController.get(req.params.username);

  res.status(result.status || 200).json(result);
});

router.post("/", async (req, res) => {
  let result = await usersController.create(req.body.data);

  res.status(result.status || 200).json(result);
});

module.exports = router;
