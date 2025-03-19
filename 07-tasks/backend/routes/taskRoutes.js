const express = require("express");
const auth = require("../middleware/auth");
const taskValidator = require("../middleware/taskValidator");
const taskController = require("../controllers/taskController");

const router = express.Router();

router.post("/", auth.authenticateToken, taskValidator.taskCreateValidator, taskController.createTask);
router.get("/", auth.authenticateToken, taskController.getTasks);
router.get("/:id", auth.authenticateToken, taskController.getTask);
router.put("/:id", auth.authenticateToken, taskValidator.taskUpdateValidator, taskController.updateTask);
router.delete("/:id", auth.authenticateToken, taskController.deleteTask);

module.exports = router;
