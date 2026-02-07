// ===========================================
// GOLD PRICE CRON JOB
// ===========================================
// Automated scheduler for periodic gold price checks
// Runs every 10 minutes to monitor gold price changes

const cron = require("node-cron");
const checkGoldPrice = require("../services/goldPriceService");

/**
 * Start the automated gold price monitoring cron job
 * @param {Object} client - Twilio client instance for sending alerts
 * 
 * Schedule pattern: Every 1 hour at minute 0 (top of the hour)
 * Cron format: minute hour day month weekday
 */
function startGoldCron(client) {
    console.log("📅 Setting up cron schedule: Every 1 hour at minute 0");

    // Schedule: Every 1 hour at minute 0
    cron.schedule("0 * * * *", async () => {
        const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
        console.log("\n" + "─".repeat(60));
        console.log(`⏱  CRON JOB TRIGGERED - ${timestamp}`);
        console.log("─".repeat(60));
        console.log("🔍 Fetching latest gold price from GoldAPI...");

        try {
            const result = await checkGoldPrice(client);

            console.log("✅ Gold price check completed successfully");
            console.log(`💰 Current Price: ₹${result.currentPrice}/gram (24k)`);
            console.log(`📊 Previous Price: ₹${result.previousPrice || 'N/A'}`);
            console.log(`📈 Price Change: ₹${result.priceDiff > 0 ? '+' : ''}${result.priceDiff}`);
            console.log(`🔔 Alert Sent: ${result.alertSent ? 'YES ✅' : 'NO'}`);

            if (result.alertSent) {
                console.log("🚨 ALERT: Significant price change detected (≥₹100)!");
            }

            console.log("─".repeat(60) + "\n");
        } catch (err) {
            console.error("❌ CRON ERROR:", err.message);
            console.error("📍 Stack trace:", err.stack);
            console.log("─".repeat(60) + "\n");
        }
    });

    console.log("✅ Cron job registered successfully");
}

module.exports = startGoldCron;
