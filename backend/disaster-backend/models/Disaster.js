const mongoose = require("mongoose");

const disasterSchema = new mongoose.Schema({
  disasterId: String,
  type: String,
  severity: String,
  location: String,
  date: String,
  description: String,
  authority: String,
  status: {
    type: String,
    default: "Reported"
  }
});

module.exports = mongoose.model(
  "Disaster",
  disasterSchema
);