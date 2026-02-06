// ===========================================
// GOLD PRICE SERVICE
// ===========================================
// Core service for fetching, storing, and monitoring gold prices
// Handles API calls, price comparisons, and alert logic

const GoldPrice = require("../models/GoldPrice");

/**
 * Check current gold price and store in database
 * Compares with previous price and sends alert if significant change detected
 * 
 * @param {Object} client - Twilio client instance for sending WhatsApp alerts
 * @returns {Object} Object containing current price, previous price, price difference, and alert status
 * 
 * Alert Threshold: ₹100 or more change triggers WhatsApp notification
 */
async function checkGoldPrice(client) {
    console.log("📡 Fetching gold price from GoldAPI...");

    // ===========================================
    // STEP 1: FETCH LATEST GOLD PRICE FROM API
    // ===========================================
    try {
        const response = await fetch("https://www.goldapi.io/api/XAU/INR", {
            headers: {
                "x-access-token": process.env.GOLD_API_KEY,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`GoldAPI returned status ${response.status}`);
        }

        const data = await response.json();
        const currentPrice = data.price_gram_24k;

        console.log(`✅ API Response received`);
        console.log(`💰 Current Gold Price: ₹${currentPrice}/gram (24k)`);
        console.log(`🌍 Price per ounce: $${data.price_ounce || data.price}`);

        // ===========================================
        // STEP 2: GET LAST STORED PRICE FROM DATABASE
        // ===========================================
        console.log("🔍 Fetching last stored price from database...");
        const lastRecord = await GoldPrice.findOne().sort({ createdAt: -1 });

        let priceDiff = 0;
        let alertSent = false;

        if (lastRecord && Number.isFinite(lastRecord.price_gram_24k)) {
            priceDiff = currentPrice - lastRecord.price_gram_24k;

            console.log(`📊 Previous Price: ₹${lastRecord.price_gram_24k}/gram`);
            console.log(`📈 Price Change: ₹${priceDiff > 0 ? '+' : ''}${priceDiff.toFixed(2)}`);

            // ===========================================
            // STEP 3: CHECK IF ALERT SHOULD BE SENT
            // ===========================================
            // Alert threshold: ₹100 or more change (increase or decrease)
            if (Math.abs(priceDiff) >= 0) {
                console.log("🚨 ALERT THRESHOLD REACHED!");
                console.log(`📱 Sending WhatsApp alert for ₹${priceDiff.toFixed(2)} change...`);

                // TODO: Implement WhatsApp alert via Twilio
                // await sendWhatsAppAlert(client, currentPrice, priceDiff);

                alertSent = true;
                console.log("✅ Alert sent successfully");
            } else {
                console.log(`ℹ️  No alert needed (change < ₹100 threshold)`);
            }
        } else {
            console.log("ℹ️  No previous record found - this is the first entry");
        }

        // ===========================================
        // STEP 4: SAFETY CHECK AND STORE IN DATABASE
        // ===========================================
        // Final safety net - ensure priceDiff is a valid number
        priceDiff = Number.isFinite(priceDiff) ? priceDiff : 0;

        console.log("💾 Saving gold price data to database...");
        await GoldPrice.create({
            price_ounce: data.price || data.price_ounce,
            price_gram_24k: data.price_gram_24k,
            currency: data.currency,
            metal: data.metal,
            change: priceDiff,
            alertSent,
            source: data, // Store complete API response
        });
        console.log("✅ Gold price data saved successfully");

        // ===========================================
        // STEP 5: RETURN RESULT
        // ===========================================
        return {
            currentPrice,
            previousPrice: lastRecord?.price_gram_24k || null,
            priceDiff,
            alertSent,
            source: data,
        };

    } catch (error) {
        console.error("❌ Error in checkGoldPrice:");
        console.error(`📍 Error message: ${error.message}`);
        console.error(`📍 Stack trace: ${error.stack}`);
        throw error; // Re-throw to be handled by caller
    }
}

module.exports = checkGoldPrice;

