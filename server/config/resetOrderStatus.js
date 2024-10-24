const cron = require('node-cron');

const db = require('./db'); // Adjust the path to your DB module if necessary

// Function to reset shop statuses at 2 PM every day
const scheduleResetShopStatus = () => {
    cron.schedule('25 20 * * *', async () => {
        try {
            await db.query('UPDATE shops SET order_status = $1', ['Pending']);
            console.log('Shop statuses reset to Pending at 8:25 PM');
        } catch (error) {
            console.error('Error resetting shop statuses:', error);
        }
    }, {
        // timezone: "America/New_York" // Adjust timezone as needed
    });
};

module.exports = scheduleResetShopStatus;
