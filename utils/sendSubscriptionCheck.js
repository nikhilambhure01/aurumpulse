async function sendSubscriptionCheck(client, phone) {
    try {
        const msg = await client.messages.create({
            from: process.env.TWILIO_WHATSAPP_FROM,
            to: `whatsapp:${phone}`,
            body: "✅ Subscription Active",
        });

        console.log(msg);

        // Give Twilio time to process
        await new Promise((r) => setTimeout(r, 2000));

        const statusResult = await client.messages(msg.sid).fetch();

        console.log(statusResult);

        if (["sent", "delivered", "read"].includes(statusResult.status)) {
            return { success: true };
        }

        return {
            success: false,
            reason: statusResult.status,
        };
    } catch (err) {
        return {
            success: false,
            reason: err.message,
        };
    }
}

module.exports = sendSubscriptionCheck;
