// ===========================================
// AURUMPULSE - Gold Price Monitoring System
// ===========================================
// Main application entry point
// Handles Express server, MongoDB connection, and cron job initialization

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const twilio = require("twilio");

const startGoldCron = require("./cron/goldCron");
const checkGoldPrice = require("./services/goldPriceService");
const User = require("./models/User");

const app = express();

app.use(express.json());

const PORT = 3000;

console.log("🚀 Starting AuruMPulse application...");

// ===========================================
// DATABASE CONNECTION
// ===========================================
// Connect to MongoDB Atlas using connection string from environment variables
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("✅ MongoDB connected successfully");
        console.log(`📊 Database ready to store gold price data`);
    })
    .catch((err) => {
        console.error("❌ MongoDB connection error:", err.message);
        process.exit(1); // Exit if DB connection fails
    });

// ===========================================
// TWILIO CLIENT SETUP
// ===========================================
// Initialize Twilio client for sending WhatsApp alerts
console.log("📱 Initializing Twilio client for WhatsApp alerts...");
const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);
console.log("✅ Twilio client initialized");

// ===========================================
// API ENDPOINTS
// ===========================================

// POST /api/users
app.post("/api/users", async (req, res) => {
    const { phone } = req.body;

    const user = await User.create({ phone });

    res.json({
        success: true,
        message: "User added. Ask user to join WhatsApp sandbox.",
        user,
    });
});

/**
 * GET /api/gold-price
 * Manual trigger to check current gold price
 * Returns current price, price difference, and alert status
 */
app.get("/api/gold-price", async (req, res) => {
    console.log("📡 API Request: Manual gold price check triggered");

    try {
        const result = await checkGoldPrice(client);
        console.log("✅ Gold price check completed successfully");
        console.log(`💰 Current Price: ₹${result.currentPrice}/gram (24k)`);
        console.log(`📊 Price Change: ₹${result.priceDiff}`);
        console.log(`🔔 Alert Sent: ${result.alertSent ? 'Yes' : 'No'}`);

        res.json({ success: true, ...result });
    } catch (error) {
        console.error("❌ Error checking gold price:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});

// ===========================================
// CRON JOB INITIALIZATION
// ===========================================
// Start automated gold price monitoring (runs every 10 minutes)
console.log("⏰ Initializing automated gold price monitoring...");
startGoldCron(client);
console.log("✅ Cron job started - checking gold price every 10 minutes");

/**
 * GET /
 * Health check endpoint
 */
app.get('/', (req, res) => {
    console.log("🏥 Health check endpoint accessed");
    res.send('Hello, Aurum! 🥇 Gold Price Monitoring System is running.');
});


// ===========================================
// START SERVER
// ===========================================
app.listen(PORT, () => {
    console.log("\n" + "=".repeat(50));
    console.log("🎉 AuruMPulse Server Started Successfully!");
    console.log("=".repeat(50));
    console.log(`🌐 Server running on http://localhost:${PORT}`);
    console.log(`📍 API Endpoint: http://localhost:${PORT}/api/gold-price`);
    console.log(`⏰ Automated checks running every 10 minutes`);
    console.log("=".repeat(50) + "\n");
});