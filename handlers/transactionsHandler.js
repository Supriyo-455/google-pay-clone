const express = require('express');
const router = express.Router();

const db = require('../service/db');

router.post('/', async (req, res, next) => {
    try {
        const transactions = await db.getAllTransactions(req.body.phoneNum);
        return res.status(200).json(transactions);
    } catch (err) {
        console.error(`error while getting transactions: ${err.message}`);
        next(err);
    }
});

module.exports = router;