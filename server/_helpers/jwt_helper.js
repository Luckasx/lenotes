const jwt = require('jsonwebtoken');

// Create token
exports.sign = (data) => {
  return jwt.sign(data, process.env.TOKEN_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

exports.signRefresh = (data) => {
  return jwt.sign(data, process.env.REFRESH_TOKEN_KEY, {
    expiresIn: "1h",
  });
};