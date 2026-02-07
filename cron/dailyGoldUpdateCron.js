const cron = require("node-cron");
const sendDailyGoldUpdate = require("../services/dailyGoldUpdateService");

// Runs every day at 9:00 AM IST
function startDailyGoldUpdateCron(client) {
    cron.schedule(
        "0 9 * * *",
        async () => {
            try {
                await sendDailyGoldUpdate(client);
            } catch (err) {
                console.error("❌ Daily cron error:", err.message);
            }
        },
        {
            timezone: "Asia/Kolkata",
        }
    );
}

module.exports = startDailyGoldUpdateCron;
