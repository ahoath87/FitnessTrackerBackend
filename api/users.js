/* eslint-disable no-useless-catch */
const express = require("express");
const {
  getUserByUsername,
  createUser,
  getPublicRoutinesByUser,
  getAllRoutinesByUser,
} = require("../db");
const router = express.Router();
const jwt = require("jsonwebtoken");

// POST /api/users/register
router.post("/register", async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const _user = await getUserByUsername(username);
    if (_user) {
      next({
        error: "Error",
        message: `User ${_user.username} is already taken.`,
        name: "UsernameTaken",
      });
    }

    if (password.length < 8) {
      next({
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

// POST / api / users / login;

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
      next({
        name: "IncorrectCredentialsError",
        message: "Username or password is incorrect",
      });
    }
  } catch (error) {
    next(error);
  }
});

// GET /api/users/me
router.get("/me", async (req, res, next) => {
  try {
    const user = await req.user;
    if (!user) {
      res.status(401);
      res.send({
        error: "",
        message: "You must be logged in to perform this action",
        name: "",
      });
    }
    res.send(user);
  } catch (error) {
    next(error);
  }
});

// GET /api/users/:username/routines
// req.params is an object containing properties mapped to the named route "parameters"
//for ex route /user/:name, the "name" property is available as req.params.name
router.get("/:username/routines", async (req, res, next) => {
  try {
    const myUsername = req.params.username;
    console.log("These are the params", req.params);
    const user = await getUserByUsername(myUsername);
    if (req.user && req.user.id === user.id) {
      const userRoutines = await getAllRoutinesByUser(req.params);
      res.send(userRoutines);
    } else {
      const userPublicRoutines = await getPublicRoutinesByUser(req.params);
      res.send(userPublicRoutines);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
