// !!! https://dev.to/cyberwolves/jwt-authentication-with-access-tokens-refresh-tokens-in-node-js-5aa9
const { Router } = require("express");
const usersController = require("../controllers/users.controller");

const jwt_helper = require("../_helpers/jwt_helper");

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

const router = Router();

router.get("/:username", async (req, res) => {
  let result = await usersController.get(req.params.username);

  res.status(result.status || 200).json(result);
});

router.post("/", async (req, res) => {
  let result = await usersController.create(req.body.data);

  res.status(result.status || 200).json(result);
});

router.post("/login", async (req, res) => {
  let result = await usersController.login(req.body.data);

  if (result.data.username) {
    const token = await jwt_helper.sign(result.data);

    const refreshToken = jwt_helper.signRefresh(result.data);

    res
      .cookie("token", token, { httpOnly: true, secure: true })
      .cookie("rtoken", refreshToken, { httpOnly: true, secure: true })
      .status(result.status || 200)
      .json(result.data);

    return;
  }

  result.status = 401;

  res.status(result.status || 200).json(result.data);
});

module.exports = router;
