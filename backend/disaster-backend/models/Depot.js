const mongoose = require("mongoose");

const depotSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  state: String,
  city: String,

  address: String,
  contactNumber: String,
  managerName: String,

  capacity: Number,

  location: {
    lat: Number,
    lng: Number
  }

}, { timestamps: true });

module.exports = mongoose.model("Depot", depotSchema);
