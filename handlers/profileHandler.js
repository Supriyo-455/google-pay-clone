const express = require('express');
const router = express.Router();

const db = require('../service/db');

router.post('/', async (req, res, next) => {
    try {
        const userData = await db.getUserByPhone(req.body.phoneNum);
        if (userData.length < 1) {
            res.status(404).json({ "message": "user not found!" });
            next();
        }
        res.status(200).json(userData[0]);
    } catch (err) {
        console.error(`error while getting user: ${err.message}`);
        res.status(500).json({
            "error": true,
            "message": "internal server server error."
        });
        next();
    }
});

module.exports = router;