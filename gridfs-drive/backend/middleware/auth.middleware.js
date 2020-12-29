const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/keys");

module.exports = (req, res, next) => {
  const token = req.header("auth-Token");
  if (!token) {
    return res.status(403).json({ errors: [{ msg: "Auth Denied" }] });
  }
  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(403).json({ errors: [{ msg: "Unauthorized" }] });
    }
    req.userId = decoded.userId;
    next();
  });
};
