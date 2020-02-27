const secrets = require("../config/secrets");
const jwt = require("jsonwebtoken");

module.exports = () => {
  return (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
      jwt.verify(token, secrets.jwt, (err, payload) => {
        if (err) {
          res
            .status(403)
            .json({ message: "You are not authorized", error: err.message });
        } else {
          if (req.is_admin === false) {
            res.status(403).json({
              message: "You are not do not have permission for this endpoint."
            });
          } else {
            req.is_admin = payload.is_admin;
            next();
          }
        }
      });
    } else {
      res.status(400).json({ message: "No credentials provided" });
    }
  };
};
