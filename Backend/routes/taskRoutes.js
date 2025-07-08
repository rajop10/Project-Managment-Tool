const express = require("express");
const { getTasks, createTask } = require("../controllers/taskController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.use(protect);
router.get("/:projectId", getTasks);
router.post("/:projectId", createTask);

module.exports = router;
