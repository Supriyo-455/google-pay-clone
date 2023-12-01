const express = require('express');
const router = express.Router();
const db = require('../service/db');
const cashback = require('../service/cashback');

router.post('/', async (req, res, next) => {
    try {
        const transactionRequest = {
            "fromPhoneNum": req.body.fromPhoneNum,
            "toPhoneNum": req.body.toPhoneNum,
            "amount": Number(req.body.amount)
        };

        if (transactionRequest.fromPhoneNum === transactionRequest.toPhoneNum) {
            return res.status(400).json({
                "error": true,
                "message": "bad request!"
            });
        }

        const senderData = await db.getUserByPhone(transactionRequest.fromPhoneNum);
        if (senderData.length < 1) {
            return res.status(404).json({ "error": true, "message": "sender wrong phone number!" });
        }
        const receiverData = await db.getUserByPhone(transactionRequest.toPhoneNum);
        if (receiverData.length < 1) {
            return res.status(404).json({ "error": true, "message": "receiver not found!" });
        }

        // first check if the sender has sufficient balance
        if (transactionRequest.amount <= senderData[0].availableAmount) {
            // credit money to the receiver.
            const receiverBalance = receiverData[0].availableAmount + transactionRequest.amount;
            await db.setMoney(transactionRequest.toPhoneNum, receiverBalance);

            // cashback for the sender
            const bonus = cashback(transactionRequest.amount);

            // deduct money from the sender.
            const senderBalance = senderData[0].availableAmount - transactionRequest.amount + bonus;
            await db.setMoney(transactionRequest.fromPhoneNum, senderBalance);

            // create a entry in the transactions table.
            await db.createTransaction(transactionRequest);

            return res.status(202).json({
                "error": false,
                "message": "transaction successful!",
                "cashback": bonus,
                "availableAmount": senderBalance
            });
        } else {
            return res.status(403).json({
                "error": true,
                "message": "not sufficient balance!"
            });
        }
    } catch (err) {
        console.error(`error while sending money: ${err.message}`);
        next(err);
    }

});


module.exports = router;