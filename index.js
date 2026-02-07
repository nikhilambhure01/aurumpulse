const express = require("express");
const mongoose = require("mongoose");
const twilio = require("twilio");
const path = require("path");

const startGoldCron = require("./cron/goldCron");
const checkGoldPrice = require("./services/goldPriceService");
const sendSubscriptionCheck = require("./utils/sendSubscriptionCheck");
const User = require("./models/User");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public"))); // Serve static files

const PORT = 3000;

console.log("🚀 Starting AuruMPulse application...");

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

// POST /api/users - Register a new user with their phone number
app.post("/api/users", async (req, res) => {
    try {
        const { phone } = req.body;

        if (!phone) {
            return res.status(400).json({
                success: false,
                message: "Phone number is required",
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ phone });

        if (existingUser) {
            return res.json({
                success: true,
                message: "User already registered",
                user: existingUser,
            });
        }

        const user = await User.create({
            phone,
            isActive: false,
            isVerified: false,
        });

        res.json({
            success: true,
            message: "User registered. Ask user to join WhatsApp sandbox.",
            user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
});

// GET /api/users/status/:phone - GET user status by phone
app.get("/api/users/status/:phone", async (req, res) => {
    const { phone } = req.params;

    const user = await User.findOne({ phone });

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }

    res.json({
        success: true,
        isActive: user.isActive,
        isVerified: user.isVerified,
    });
});

// POST /api/subscription/check
app.post("/api/subscription/check", async (req, res) => {
    try {
        const { phone } = req.body;

        if (!phone) {
            return res.status(400).json({
                success: false,
                message: "Phone number is required",
            });
        }

        const user = await User.findOne({ phone });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const result = await sendSubscriptionCheck(client, phone);

        if (result.success) {
            user.isActive = true;
            await user.save();

            return res.json({
                success: true,
                message: "Subscription is active",
                user,
            });
        } else {
            user.isActive = false;
            await user.save();

            return res.status(403).json({
                success: false,
                message: "Subscription inactive. Ask user to join WhatsApp sandbox.",
                reason: result.reason,
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
});

// POST /api/gold-price
app.post("/api/gold-price", async (req, res) => {
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

// CRON JOB INITIALIZATION
// Start automated gold price monitoring (runs every 10 minutes)
startGoldCron(client);
console.log("✅ Cron job started - checking gold price every 10 minutes");

// FRONTEND ROUTES
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "public/login.html"));
});

app.get("/dashboard", (req, res) => {
    res.sendFile(path.join(__dirname, "public/dashboard.html"));
});


// START SERVER
app.listen(PORT, () => {
    console.log("\n" + "=".repeat(50));
    console.log("🎉 AuruMPulse Server Started Successfully!");
    console.log("=".repeat(50));
    console.log(`🌐 Server running on http://localhost:${PORT}`);
    console.log(`📍 API Endpoint: http://localhost:${PORT}/api/gold-price`);
    console.log(`⏰ Automated checks running every 10 minutes`);
    console.log("=".repeat(50) + "\n");
});