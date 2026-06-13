const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const resourceRoutes = require("./routes/resourceRoutes");
const logRoutes = require("./routes/logRoutes");
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const disasterRoutes =require("./routes/disasterRoutes");

const app = express();

// Connect DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/resources", resourceRoutes);
app.use("/api/logs", logRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/disasters", disasterRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});