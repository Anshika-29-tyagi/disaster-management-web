const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },
  action: {
    type: String, // e.g., "ASSIGN" or "RELEASE"
    required: true
  },
  resource: {     // Added this to store "Ambulance", "Fire Truck", etc.
    type: String
  },
  performedBy: {
    type: String,
    default: "Admin"
  },
  remarks: {
    type: String
  }
});

module.exports = mongoose.model("Log", logSchema);