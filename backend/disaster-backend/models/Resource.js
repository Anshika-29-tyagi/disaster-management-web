const mongoose = require("mongoose");

const ResourceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String },
  priority: { type: String, enum: ["low", "medium", "high", "critical"] },
  total: { type: Number, default: 0 },
  used: { type: Number, default: 0 },
  assignedTo: { type: String }, 
  landmark: { type: String }, // Permanent location memory
  state: { type: String },
  city: { type: String },
  availability: { type: String, default: "24x7" },
  utilization: { type: Number, default: 0 }
});

module.exports = mongoose.model("Resource", ResourceSchema);