-- Create Users Table with Encrypted Password
CREATE TABLE Users (
    phoneNum VARCHAR(15) PRIMARY KEY,
    password VARCHAR(64), -- Assuming SHA-256 hash, adjust length accordingly
    availableAmount INT
);

-- Create Transactions Table with Amount as INT
CREATE TABLE Transactions (
    transactionID INT AUTO_INCREMENT PRIMARY KEY,
    fromPhoneNum VARCHAR(15),
    toPhoneNum VARCHAR(15),
    amount INT,
    FOREIGN KEY (fromPhoneNum) REFERENCES Users(phoneNum),
    FOREIGN KEY (toPhoneNum) REFERENCES Users(phoneNum)
);