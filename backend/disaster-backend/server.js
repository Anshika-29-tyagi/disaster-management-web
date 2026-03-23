const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const resourceRoutes = require("./routes/resourceRoutes");
const logRoutes = require("./routes/logRoutes");

const app = express();

// ✅ Connect DB
connectDB();

// ✅ Middleware (ORDER MATTERS)
app.use(cors());           // 🔥 MUST BE BEFORE ROUTES
app.use(express.json());

// ✅ Routes
app.use("/api/resources", resourceRoutes);
app.use("/api/logs", logRoutes);

// ✅ Test
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
