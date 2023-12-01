const express = require('express');

const jwtMiddleware = require('./middlewares/jwtMiddleware');
const errorMiddleware = require('./middlewares/errorMiddleware');

const loginHandler = require('./handlers/loginHandler');
const signupHandler = require('./handlers/signupHandler');
const profileHandler = require('./handlers/profileHandler');
const sendMoneyHandler = require('./handlers/sendMoneyHandler');
const balanceHandler = require('./handlers/balanceHandler');
const transactionsHandler = require('./handlers/transactionsHandler');

const app = express();
const port = 4000;

app.use(express.json());

app.use(express.urlencoded({
    extended: true,
}));

app.use('/login', loginHandler);
app.use('/signup', signupHandler);

app.use('/profile', [jwtMiddleware, profileHandler]);
app.use('/send', [jwtMiddleware, sendMoneyHandler]);
app.use('/balance', [jwtMiddleware, balanceHandler]);
app.use('/transactions', [jwtMiddleware, transactionsHandler]);

app.use(errorMiddleware);

app.listen(port, () => {
    console.log(`Running on port, ${port}`);
});