async function sendWhatsAppAlert(
    client,
    toPhone,        // +91XXXXXXXXXX
    prevPrice,
    currentPrice,
    priceDiff
) {
    const message = `🚨 Gold 24k Price Alert!

Previous Price: ₹${prevPrice}
Current Price: ₹${currentPrice}
Change: ₹${priceDiff.toFixed(2)}

⚠️ Price changed by more than ${process.env.GOLD_PRICE_CHANGE_THRESHOLD} INR!`;

    try {
        console.log("📤 Sending WhatsApp alert to:", toPhone);

        // 1️⃣ Send message (queued by Twilio)
        const msg = await client.messages.create({
            from: process.env.TWILIO_WHATSAPP_FROM,
            to: `whatsapp:${toPhone}`,
            body: message,
        });

        console.log("📨 Message queued. SID:", msg.sid);

        // 2️⃣ Wait for Twilio to process
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // 3️⃣ Fetch delivery status
        const statusResult = await client.messages(msg.sid).fetch();

        console.log(
            `📡 Message status for ${toPhone}:`,
            statusResult.status
        );

        // 4️⃣ Decide success based on real status
        if (["sent", "delivered", "read"].includes(statusResult.status)) {
            console.log("✅ WhatsApp alert delivered successfully");

            return {
                success: true,
                verified: true,
                status: statusResult.status,
            };
        }

        console.log("❌ WhatsApp alert NOT delivered");

        return {
            success: false,
            verified: false,
            status: statusResult.status,
        };

    } catch (err) {
        console.error("🚨 Twilio error:", err.message);

        // Sandbox / verification related errors
        if (err.code === 63007 || err.code === 63003) {
            return {
                success: false,
                verified: false,
                reason: "USER_NOT_JOINED_SANDBOX",
            };
        }

        return {
            success: false,
            verified: false,
            reason: err.message,
        };
    }
}

module.exports = sendWhatsAppAlert;
