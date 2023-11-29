const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../config');

const jwtValidate = (req, res, next) => {
    const token = req.header('x-access-token');
    if (token) {
        jwt.verify(token, config.jwt.secret, (err, res) => {
            if (err) {
                return res.status(401).json({
                    "error": true,
                    "message": 'Unauthorized access!.'
                });
            }
            next();
        });
    } else {
        return res.status(403).send({
            "error": true,
            "message": 'No token provided.'
        });
    }
};

module.exports = jwtValidate;