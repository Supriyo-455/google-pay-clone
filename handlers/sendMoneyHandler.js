const express = require('express');
const router = express.Router();
const db = require('../service/db');

router.post('/', async (req, res, next) => {
    const transactionRequest = {
        "fromPhoneNum": req.body.fromPhoneNum,
        "toPhoneNum": req.body.toPhoneNum,
        "amount": Number(req.body.amount)
    };
    try {
        const senderData = await db.getUserByPhone(transactionRequest.fromPhoneNum);
        if (senderData.length < 1) {
            res.status(404).json({ "error": true, "message": "sender wrong phone number!" });
            next();
        }
        const receiverData = await db.getUserByPhone(transactionRequest.toPhoneNum);
        if (receiverData.length < 1) {
            res.status(404).json({ "error": true, "message": "receiver not found!" });
            next();
        }

        // first check if the sender has sufficient balance
        if (transactionRequest.amount <= senderData[0].availableAmount) {
            // deduct money from the sender.
            await db.setMoney(transactionRequest.fromPhoneNum, senderData[0].availableAmount - transactionRequest.amount);
            // credit money to the receiver.
            await db.setMoney(transactionRequest.toPhoneNum, receiverData[0].availableAmount + transactionRequest.amount);

            // create a entry in the transactions table.
            await db.createTransaction(transactionRequest);

            res.status(202).json({
                "error": false,
                "message": "transaction successful!"
            });
        } else {
            res.status(403).json({
                "error": true, "message": "not sufficient balance!"
            });
            next();
        }
    } catch (err) {
        console.error(`error while sending money: ${err.message}`);
        res.status(500).json({
            "error": true,
            "message": "internal server server error."
        });
        next();
    }

});


module.exports = router;