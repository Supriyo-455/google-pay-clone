const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const db = require('../service/db');
const auth = require('../service/auth');
const config = require('../config');

router.post('/', async (req, res, next) => {
    const userLoginRequest = {
        phoneNum: req.body.phoneNum,
        password: req.body.password
    };

    try {
        const validUser = await auth.checkPhoneAndPassword(userLoginRequest.phoneNum, userLoginRequest.password);
        if (validUser) {
            const token = jwt.sign(userLoginRequest, config.jwt.secret, { expiresIn: config.jwt.tokenLife });
            const refreshToken = jwt.sign(userLoginRequest, config.jwt.refreshTokenSecret, { expiresIn: config.jwt.refreshTokenLife });
            const response = {
                "status": "logged in",
                "token": token,
                "refreshToken": refreshToken
            };
            res.status(202).json(response);
        } else {
            res.status(401).json({
                "error": true,
                "message": "wrong phoneNum or password!"
            });
        }
    } catch (err) {
        console.error(`error while loggin in the user: ${err.message}`);
        res.status(500).json({
            "error": true,
            "message": "internal server error!"
        });
        next();
    }

});

module.exports = router;