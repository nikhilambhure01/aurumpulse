const GoldPrice = require("../models/GoldPrice");
const User = require("../models/User");

async function sendDailyGoldUpdate(client) {
    console.log("📅 Running daily gold update...");

    // Get latest gold price from DB
    const latestPrice = await GoldPrice.findOne()
        .sort({ createdAt: -1 });

    if (!latestPrice) {
        console.log("⚠️ No gold price data found");
        return;
    }

    // Get active users only
    const users = await User.find({
        isActive: true
    });

    if (!users.length) {
        console.log("⚠️ No active users found");
        return;
    }

    const message = `📅 Daily Gold Price Update

24K Gold Price Today:
₹${latestPrice.price_gram_24k} per gram

Stay informed with AurumPulse 💰`;

    for (const user of users) {
        try {
            await client.messages.create({
                from: process.env.TWILIO_WHATSAPP_FROM,
                to: `whatsapp:${user.phone}`,
                body: message,
            });

            console.log(`✅ Daily update sent to ${user.phone}`);
        } catch (err) {
            console.error(
                `❌ Failed for ${user.phone}:`,
                err.message
            );
        }
    }
}

module.exports = sendDailyGoldUpdate;
