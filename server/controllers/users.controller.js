const service = require("./../services/users.service");

const jwt_helper = require("../_helpers/jwt_helper");

const date_helper = require("../_helpers/date.helper")

exports.create = async (user) => {
  let results = await service.create(user);

  return results;
};

exports.get = async (username) => {
  let results = await service.get(username);

  return results;
};

exports.login = async (req, res) => {
  let result = {};
  result.data = await service.login(req.body.data);

  if (result.data && result.data?.username) {
    const token = await jwt_helper.sign(result.data);

    const refreshToken = jwt_helper.signRefresh(result.data);

    let oToken = {username: result.data.username, rtoken: refreshToken, expires: date_helper.addHours({hours: 1}) }

    console.log(oToken)

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
