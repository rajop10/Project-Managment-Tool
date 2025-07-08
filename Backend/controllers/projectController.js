const Project = require("../models/Project");

exports.getProjects = async (req, res) => {
  const projects = await Project.find({ createdBy: req.user.id });
  res.json(projects);
};

exports.createProject = async (req, res) => {
  const project = await Project.create({ ...req.body, createdBy: req.user.id });
  res.status(201).json(project);
};
