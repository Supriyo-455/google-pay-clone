## google pay clone
### requirements
    # Google pay like app.
        - I person can transfer money to other person
        - system captures user data and maintains a transaction structure

        # user data
            - phoneNum: user's phone number
            - availableAmount: current balance in the user's wallet

        # Transaction structure
            - from: the sender's phone number
            - to: the recipient's phone number
            - amount: the amount to be transferred

        # Functionalities:
            - Log in
                - Implement a log-in system where a user can log in with their phone number
                - If it's the first login, allow the user to add an initial amount to their wallet

            - Transfer amount
                - Allow the user to enter the amount to transfer and the recipient's phone number.
                - Ensure that the sender has sufficient balance.
                - Deduct the transferred amount from the sender and credit it to the recipient.

            - Cashback handling
                - Implement a cashback based on following conditions
                    - No cashback if the amount is not a multiple of 500 (e.g, 1000, 1500, 2000)
                    - If the amount is a multiple of 500, randomly give a coupon or notify the user of
                    better luck next time.
                    - 5% cashback if the transaction amount is under 1000.
                    - 2% cashback if the transaction amount is above 1000.

            - Display information
                - Show cashback details after the transaction.
                - Optionally, display the available amount of the current user.
                - Display the transaction list of the user.

## Routes
    - /login => login using phone and password, generates jwt token.
    - /signup => signup using phone, password, initial balance, it encrypts the password then store it inside a mysql db
    - /send => send money from the logged in user account to a receiver account, uses amount, fromPhoneNumber and toPhoneNum.
    - /profile => get the profile details
    - /transactions => view all the transactions
    - /balance => get the avaliable balance

## Features
    - DB used mysql
    - password encryption using bcrypt
    - jwt for authentication
    - express for the server and routes

## Steps to run on local machine
    - 1) install mysql, nodejs
    - 2) create database configs according to config.js or you can change the config.js
    - 3) run `npm install` from the project directory
    - 4) you must recheck your db configs
    - 5) run `npm run seedDb`
    - 6) If no error occurs then your db and express is configured to run the app
    - 7) run `npm run app`

### That's it, it should be running on localhost:4000