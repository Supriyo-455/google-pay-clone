const db = require('../service/db');
const passUtils = require('../utils/passwordUtils');

const checkPhoneAndPassword = async (phone, password) => {
    const user = await db.getUserByPhone(phone);
    if (user.length < 1) {
        return false;
    }
    return await passUtils.validatePassAndHash(password, user[0].password);
};

module.exports = {
    checkPhoneAndPassword
};