const express = require('express');
const jwtMiddleware = require('./middlewares/jwtMiddleware');
const errorMiddleware = require('./middlewares/errorMiddleware');
const loginHandler = require('./handlers/loginHandler');
const signupHandler = require('./handlers/signupHandler');

const app = express();
const port = 4000;

app.use(express.json());

app.use(express.urlencoded({
    extended: true,
}));

app.use('/login', loginHandler);
app.use('/signup', signupHandler);

// app.use('/profile', [jwtValidate, profileHandler]);
// app.use('/send', [jwtValidate, sendMoneyHandler]);
// app.use('/balance', [jwtValidate, balanceHandler]);

app.use(errorMiddleware);

app.listen(port, () => {
    console.log(`Running on port, ${port}`);
});