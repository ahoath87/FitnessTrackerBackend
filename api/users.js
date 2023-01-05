/* eslint-disable no-useless-catch */
const express = require("express");
const { getUserByUsername, createUser } = require("../db");
const router = express.Router();
const jwt = require("jsonwebtoken");

// POST /api/users/register
router.post("/register", async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const _user = await getUserByUsername(username);
    // console.log("this is underscore user", _user);
    if (_user) {
      res.send({
        error: "Error",
        message: `User ${_user.username} is already taken.`,
        name: "UsernameTaken",
      });
    }

    if (password.length < 8) {
      res.send({
        error: "Error",
        message: "Password Too Short!",
        name: "InsufficientPassword",
      });
    }

    // if (password.length >= 8) {
    const user = await createUser({
      username,
      password,
    });

    const token = jwt.sign(
      {
        id: user.id,
        username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1W",
      }
    );
    console.log("this is user", user);
    res.send({
      message: "thank you for signing up",
      token: token,
      user: user,
    });
    // }
  } catch (error) {
    next(error);
  }
});

POST / api / users / login;

router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await getUserByUsername(username);
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET
    );
    if (user && user.password == password) {
      res.send({ user: user, message: "you are logged in", token: token });
    } else {
      res.send({
        name: "IncorrectCredentialsError",
        message: "Username or password is incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// GET /api/users/me

// GET /api/users/:username/routines

module.exports = router;
