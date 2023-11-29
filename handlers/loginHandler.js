const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    userLoginRequest = {
        "phone": req.body.phone,
        "password": req.body.password
    };

    // pass the userLoginRequest to check for login


});

export default router;