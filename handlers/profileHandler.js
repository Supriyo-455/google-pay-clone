const express = require('express');
const router = express.Router();

const db = require('../service/db');

router.post('/', async (req, res, next) => {
    try {
        const userData = await db.getUserByPhone(req.body.phoneNum);
        if (userData.length < 1) {
            return res.status(404).json({ "message": "user not found!" });
        }
        return res.status(200).json(userData[0]);
    } catch (err) {
        console.error(`error while getting user: ${err.message}`);
        next(err);
    }
});

module.exports = router;