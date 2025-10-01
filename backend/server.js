const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks"); // ✅ import tasks

const app = express();

// ✅ Middleware
app.use(cors({
  origin: [
    "http://localhost:5173",                // ✅ allow local dev
    "https://scalable-web-app-amber.vercel.app" // ✅ allow deployed frontend
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);  // ✅ mount tasks

// ✅ Test Route
app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

// ✅ MongoDB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

