const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: { type: String, enum: ["Todo", "In Progress", "Done"], default: "Todo" },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  dueDate: Date
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);
