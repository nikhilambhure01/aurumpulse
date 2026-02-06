async function sendWhatsAppAlert(client, prevPrice, currentPrice, priceDiff) {
    const message = `🚨 Gold Price Alert!

Previous Price: ₹${prevPrice}
Current Price: ₹${currentPrice}
Change: ₹${priceDiff.toFixed(2)}

⚠️ Price changed by more than ₹500`;

    await client.messages.create({
        from: process.env.TWILIO_WHATSAPP_FROM,
        to: process.env.TWILIO_WHATSAPP_TO,
        body: message,
    });
}

module.exports = sendWhatsAppAlert;
