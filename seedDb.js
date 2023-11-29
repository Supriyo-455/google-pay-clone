const mysql = require('mysql2');
const config = require('./config');
const fs = require('fs');

const seedQuery = fs.readFileSync('./seed.sql', {
    encoding: "utf-8"
});

const connection = mysql.createConnection(config.db);
connection.connect();

console.log("running sql seed script...");

connection.query(seedQuery, (err, res) => {
    if (err) {
        console.error("error executing SQL script: ", err.message);
        throw err;
    }

    console.log("SQL seeding completed!\n", JSON.stringify(res));
    connection.end();
});