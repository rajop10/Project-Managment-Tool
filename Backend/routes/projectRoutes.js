const express = require("express");
const { getProjects, createProject } = require("../controllers/projectController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.use(protect);
router.get("/", getProjects);
router.post("/", createProject);

module.exports = router;
