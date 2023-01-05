/* eslint-disable no-useless-catch */
const express = require("express");
const { getUserByUsername, createUser } = require("../db");
const router = express.Router();
const jwt = require('jsonwebtoken');

// POST /api/users/register
router.post('/register', async (req, res, next) => {
    const {username, password} = req.body;

    try {
        
        const _user = await getUserByUsername(username);
        if (_user) {
            res.send({
                error: "Error",
                message: `User ${_user.username} is already taken.`,
                name: "UsernameTaken",
            })
        }

        if(password.length < 8 ) {
            res.send({
                error: "Error",
                message: "Password Too Short!",
                name: "InsufficientPassword",
            });
        }

        if(password.length >= 8) {
            const user = await createUser({
                username, password
            });
            
            const token = jwt.sign({
                id: user.id,
                username
            }, process.env.JWT_SECRET, {
                expiresIn: '1W'
            });
            
            res.send({
                message: "thank you for signing up",
                token: token,
                user: user,
            });
        }

    } catch ({name, message}) {
        next({name, message});
    }
})

// POST /api/users/login

// GET /api/users/me

// GET /api/users/:username/routines

module.exports = router;
