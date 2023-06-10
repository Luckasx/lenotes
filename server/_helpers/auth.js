const jwt = require("jsonwebtoken");

/**
 * This function checks the req sent token:
 * - when undefined return 401
 * - when invalid return 403
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const verifyToken = (req, res, next) => {
  const token =
    req.body.token ||
    req.query.token ||
    req.headers["x-access-token"] ||
    req.cookies.token;

  if (!token) {
    return res
      .status(401)
      .json({ msg: "A token is required for authentication" });
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(403).send({ msg: "Invalid Token" });
  }
  return next();
};

module.exports = verifyToken;
