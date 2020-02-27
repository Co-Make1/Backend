const express = require("express");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets");
const validator = require("../middlewares/validator");

const usersModel = require("../users/users-model.js");

const router = express.Router();

function genToken(user) {
  return jwt.sign(
    {
      userId: user.id,
      message: `Welcome ${user.username}`,
      is_admin: user.is_admin
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d"
    }
  );
}

router.post(
  "/register",
  validator("username"),
  validator("password"),
  validator("email"),
  validator("city"),
  validator("state"),
  validator("zip_code"),

  async (req, res, next) => {
    try {
      let user = req.body;
      const hash = await bycrypt.hashSync(user.password, 10);
      user.password = hash;
      const registerUser = await usersModel.add(user);
      const token = await genToken(registerUser);
      const newUser = await usersModel.findById(registerUser.id);
      res.status(201).json({
        token,
        user: newUser
      });
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/login",
  validator("username"),
  validator("password"),
  async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const user = await usersModel.findBy({ username });
      if (user) {
        const passwordValid = await bycrypt.compareSync(
          password,
          user.password,
          10
        );
        if (passwordValid) {
          const token = genToken(user);
          const userWithoutPassword = await usersModel.findById(user.id);
          res.status(200).json({
            token,
            user: userWithoutPassword
          });
        }
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
