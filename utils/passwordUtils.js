const bcrypt = require('bcrypt');

const saltRounds = 3;

const encryptPass = async (password) => {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, saltRounds);
        return hash;
    } catch (err) {
        console.error(`error while encrypting password: ${err.message}`);
    }
};

const validatePassAndHash = async (password, hash) => {
    try {
        const res = await bcrypt.compare(password, hash);
        return res;
    } catch (err) {
        console.error(`error while comparing password and hash, ${err.message}`);
    }
};

module.exports = {
    encryptPass,
    validatePassAndHash
};