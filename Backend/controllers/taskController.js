const Task = require("../models/Task");

exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ projectId: req.params.projectId });
  res.json(tasks);
};

exports.createTask = async (req, res) => {
  const task = await Task.create({ ...req.body, projectId: req.params.projectId });
  req.app.get("io").emit("task-refresh");
  res.status(201).json(task);
};
