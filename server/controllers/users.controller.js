const service = require("./../services/users.service");

const jwt_helper = require("../_helpers/jwt_helper");

const date_helper = require("../_helpers/date.helper");

exports.create = async (user) => {
  let results = await service.create(user);

  return results;
};

exports.get = async (username) => {
  let results = await service.get(username);

  return results;
};

exports.refresh = async (req, res) => {
  let result = {};

  let rtoken = req.cookies["rtoken"]

  

  try {
    result.data = await service.checkRefreshToken(
      req.body,
      rtoken
    );

    //if there is a valid refresh token in db
    // it generates new token and refresh token
    if (result.data) {
      const token = await jwt_helper.sign(req.body);

      const refreshToken = jwt_helper.signRefresh(req.body);

      await service.deleteToken(rtoken)

      let oToken = {
        username: req.body.username,
        rtoken: refreshToken,
        expires: date_helper.addHours({ hours: 1 })
      };

      await service.storeRefreshToken(oToken);

      res
        .cookie("token", token, { httpOnly: true, secure: true })
        .cookie("rtoken", refreshToken, { httpOnly: true, secure: true })
        .status(result.status || 200)
        .json(result.data);

      return;
    }
  } catch (err) {
    console.error(err);
  }

  result.status = 401;

  res.status(result.status || 200).json(result.data);
};

exports.login = async (req, res) => {
  let result = {};
  result.data = await service.login(req.body.data);

  if (result.data && result.data?.username) {
    const token = await jwt_helper.sign(result.data);

    const refreshToken = jwt_helper.signRefresh(result.data);

    let oToken = {
      username: result.data.username,
      rtoken: refreshToken,
      expires: date_helper.addHours({ hours: 1 }),
    };

    await service.storeRefreshToken(oToken);

    res
      .cookie("token", token, { httpOnly: true, secure: true })
      .cookie("rtoken", refreshToken, { httpOnly: true, secure: true })
      .status(result.status || 200)
      .json(result.data);

    return;
  }

  result.status = 401;

  res.status(result.status || 200).json(result.data);
};
