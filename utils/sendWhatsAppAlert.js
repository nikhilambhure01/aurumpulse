async function sendWhatsAppAlert(
    client,
    toPhone,        // +91XXXXXXXXXX
    prevPrice,
    currentPrice,
    priceDiff
) {
    const message = `🚨 Gold Price Alert!

Previous Price: ₹${prevPrice}
Current Price: ₹${currentPrice}
Change: ₹${priceDiff}

⚠️ Price changed by more than ${process.env.GOLD_PRICE_CHANGE_THRESHOLD} INR!`;

    try {
        await client.messages.create({
            from: process.env.TWILIO_WHATSAPP_FROM,
            to: `whatsapp:${toPhone}`,
            body: message,
        });

        return {
            success: true,
            verified: true,
        };
    } catch (err) {
        // Sandbox / verification related errors
        if (err.code === 63007 || err.code === 63003) {
            return {
                success: false,
                verified: false,
                reason: "USER_NOT_JOINED_SANDBOX",
            };
        }

        // Other Twilio errors
        return {
            success: false,
            verified: false,
            reason: err.message,
        };
    }
}

module.exports = sendWhatsAppAlert;
