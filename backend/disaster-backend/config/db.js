const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("Trying to connect MongoDB...");

    await mongoose.connect("mongodb://127.0.0.1:27017/disasterDB");

    console.log("MongoDB connected ✅");
  } catch (error) {
    console.error("MongoDB connection failed ❌");
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
