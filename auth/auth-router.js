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
      message: `Welcome ${user.username}`
    },
    secrets.jwt,
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
  validator("location"),

  async (req, res, next) => {
    try {
      let user = req.body;
      const hash = await bycrypt.hashSync(user.password, 10);
      user.password = hash;
      const registerUser = await usersModel.add(user);
      const token = await genToken(registerUser);
      const newUser = await usersModel.findById(registerUser.id);
      console.log(newUser);
      res.status(201).json({
        token,
        user: newUser
      });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
