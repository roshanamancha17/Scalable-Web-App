const mongoose = require("mongoose");

// Task schema definition
const taskSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true } // automatically add createdAt and updatedAt
);

module.exports = mongoose.model("Task", taskSchema);
