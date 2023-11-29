const mysql2 = require('mysql2/promise');
const config = require('../config');
const helper = require('../utils/dbHelper');

const usersTable = "Users";
const transactionTable = "Transactions";

const getUserByPhone = async (phoneNum) => {
    const connection = await mysql2.createConnection(config.db);
    const [rows] = await connection.execute(`select * from ${usersTable} where phoneNum='${phoneNum}'`);
    const data = helper.emptyOrRows(rows);

    connection.end();
    return data;
}

const createUser = async (user) => {
    const connection = await mysql2.createConnection(config.db);
    const [rows] = await connection.execute(`insert into ${usersTable} (phoneNum, password, availableAmount)
                                values ('${user.phoneNum}','${user.password}', ${user.availableAmount})`);
    const data = helper.emptyOrRows(rows);

    connection.end();
    return data;
}

module.exports = {
    getUserByPhone,
    createUser
};