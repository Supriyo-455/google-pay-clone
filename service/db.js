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

const createTransaction = async (transactionRequest) => {
    const connection = await mysql2.createConnection(config.db);
    const [rows] = await connection.execute(`insert into ${transactionTable} (fromPhoneNum, toPhoneNum, amount)
                                values ('${transactionRequest.fromPhoneNum}','${transactionRequest.toPhoneNum}', ${transactionRequest.amount})`);
    const data = helper.emptyOrRows(rows);
    return data;
}

const setMoney = async (phoneNum, money) => {
    const connection = await mysql2.createConnection(config.db);
    const [rows] = await connection.execute(`update ${usersTable} set availableAmount=${money} where phoneNum='${phoneNum}'`);
    const data = helper.emptyOrRows(rows);
    return data;
}

module.exports = {
    getUserByPhone,
    createUser,
    createTransaction,
    setMoney
};