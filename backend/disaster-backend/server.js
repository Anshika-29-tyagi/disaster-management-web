
console.log("Server started");

const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();

// 👇 THIS MUST RUN
connectDB();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
