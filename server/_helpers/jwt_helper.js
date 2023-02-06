const jwt = require('jsonwebtoken');

// Create token
exports.sign = (data) => {
  return jwt.sign(data, process.env.TOKEN_KEY, {
    expiresIn: "1h",
  });
};
