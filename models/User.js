const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("User", userSchema);
