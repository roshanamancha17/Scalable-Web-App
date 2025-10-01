const express = require("express");
const jwt = require("jsonwebtoken");
const Task = require("../models/Task");

const router = express.Router();

// Middleware: verify JWT
function authMiddleware(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
}

// ✅ Get all tasks
router.get("/", authMiddleware, async (req, res) => {
  const tasks = await Task.find({ user: req.userId }).sort({ createdAt: -1 });
  res.json(tasks);
});

// ✅ Add task
router.post("/", authMiddleware, async (req, res) => {
  if (!req.body.text) return res.status(400).json({ error: "Task text required" });
  const newTask = await Task.create({ user: req.userId, text: req.body.text });
  res.json(newTask);
});

// ✅ Delete task
router.delete("/:id", authMiddleware, async (req, res) => {
  await Task.findOneAndDelete({ _id: req.params.id, user: req.userId });
  res.json({ message: "Task deleted" });
});

module.exports = router;
