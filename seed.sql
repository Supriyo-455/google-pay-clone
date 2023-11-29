-- Create Users Table with Encrypted Password
CREATE TABLE Users (
    phoneNum VARCHAR(15) PRIMARY KEY,
    password VARCHAR(64), -- Assuming SHA-256 hash, adjust length accordingly
    availableAmount DECIMAL(10, 2)
);

-- Create Transactions Table
CREATE TABLE Transactions (
    transactionID INT AUTO_INCREMENT PRIMARY KEY,
    fromPhoneNum VARCHAR(15),
    toPhoneNum VARCHAR(15),
    amount DECIMAL(10, 2),
    FOREIGN KEY (fromPhoneNum) REFERENCES Users(phoneNum),
    FOREIGN KEY (toPhoneNum) REFERENCES Users(phoneNum)
);

-- Insert Sample Data into Users Table with Encrypted Passwords
-- Use a secure method to generate and store hashed passwords (e.g., bcrypt)
-- For demonstration purposes, we'll store pre-hashed passwords
INSERT INTO Users (phoneNum, password, availableAmount) VALUES
    ('1234567890', '7c4a8d09ca3762af61e59520943dc26494f8941b', 1000.00), -- "password1"
    ('9876543210', '6cb75f652a9b52798eb6cf2201057c73d588c7f2', 500.50),  -- "password2"
    ('5551112222', '4c03c6c7d68aaf6e8c6c5100fd9ab7d1985ef085', 1200.75); -- "password3"

-- Insert Sample Data into Transactions Table
INSERT INTO Transactions (fromPhoneNum, toPhoneNum, amount) VALUES
    ('1234567890', '9876543210', 200.50),
    ('5551112222', '1234567890', 50.25),
    ('9876543210', '5551112222', 100.00);
