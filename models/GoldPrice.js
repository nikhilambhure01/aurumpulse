// ===========================================
// GOLD PRICE MODEL
// ===========================================
// Mongoose schema and model for storing gold price data
// Tracks historical gold prices, changes, and alert status

const mongoose = require("mongoose");

/**
 * Gold Price Schema
 * Stores comprehensive gold price information from GoldAPI
 * 
 * Fields:
 * - price_ounce: XAU price (global standard, per ounce)
 * - price_gram_24k: INR price for 24k gold per gram (our primary metric)
 * - currency: Currency code (e.g., "INR")
 * - metal: Metal type (e.g., "XAU" for gold)
 * - change: Price difference from previous record (in INR)
 * - alertSent: Boolean flag indicating if WhatsApp alert was sent
 * - source: Complete API response stored for reference and debugging
 * - timestamps: Auto-generated createdAt and updatedAt fields
 */
const goldPriceSchema = new mongoose.Schema(
    {
        price_ounce: {
            type: Number,
            required: true,
            comment: "XAU price per ounce (global standard)"
        },
        price_gram_24k: {
            type: Number,
            required: true,
            comment: "INR price for 24k gold per gram"
        },
        currency: {
            type: String,
            required: true,
            default: "INR",
            comment: "Currency code"
        },
        metal: {
            type: String,
            required: true,
            default: "XAU",
            comment: "Metal type (XAU for gold)"
        },
        change: {
            type: Number,
            default: 0,
            comment: "Price difference from previous record"
        },
        alertSent: {
            type: Boolean,
            default: false,
            comment: "Flag indicating if WhatsApp alert was sent"
        },
        source: {
            type: mongoose.Schema.Types.Mixed,
            comment: "Complete API response for reference"
        }
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt
        collection: 'goldprices' // Explicit collection name
    }
);

// Add index for faster queries on createdAt (used for sorting)
goldPriceSchema.index({ createdAt: -1 });

// Export the model
module.exports = mongoose.model("GoldPrice", goldPriceSchema);
