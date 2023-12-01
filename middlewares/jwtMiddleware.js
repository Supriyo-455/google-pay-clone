const jwt = require('jsonwebtoken');
const config = require('../config');

const jwtValidate = (req, res, next) => {
    const token = req.header('x-access-token');
    if (token) {
        jwt.verify(token, config.jwt.secret, (err, result) => {
            if (err) {
                console.error(`error verifing jwt: ${err.message}`);
                return res.status(401).json({
                    "error": true,
                    "message": 'Unauthorized access!.'
                });
            }
            next();
        });
    } else {
        console.error(`token not found!`);
        return res.status(403).send({
            "error": true,
            "message": 'not authorized.'
        });
    }
};

module.exports = jwtValidate;