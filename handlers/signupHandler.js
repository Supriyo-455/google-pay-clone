const express = require('express');
const db = require("../service/db");
const passwordUtil = require("../utils/passwordUtils");
const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const userSignupRequest = {
            phoneNum: req.body.phoneNum,
            password: req.body.password,
            availableAmount: req.body.availableAmount
        };
        userSignupRequest.password = await passwordUtil.encryptPass(userSignupRequest.password);
        res.status(201).json(await db.createUser(userSignupRequest));
    } catch (err) {
        console.error(`error while creating user: ${err.message}`);
        res.status(500).json({
            "error": true,
            "message": "internal server server error."
        });
        next();
    }
});

module.exports = router;