require('dotenv').config();

const config = {
    db: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: "googlepay",
        port: 3306,
        multipleStatements: true,
        connectTimeout: 60000,
    },
    jwt: {
        "secret": process.env.JWT_SECRET,
        "refreshTokenSecret": process.env.JWT_REFRESH_TOKEN_SECRET,
        "port": 3000,
        "tokenLife": 900,
        "refreshTokenLife": 86400
    }
};

module.exports = config;