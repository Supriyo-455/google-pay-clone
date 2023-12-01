const cashback = (amount) => {
    if (amount % 500 == 0) {
        const lucky = Math.random() < 0.5;
        if (lucky) {
            if (amount < 1000) {
                return amount * 0.05; // 5% cashback for amounts under 1000
            } else {
                return amount * 0.02; // 2% cashback for amounts above 1000
            }
        } else {
            return 0;
        }
    } else {
        return 0;
    }
}

module.exports = cashback;