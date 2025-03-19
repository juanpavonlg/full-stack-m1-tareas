const express = require("express");
const auth = require("../middleware/auth");
const userValidator = require("../middleware/userValidator");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/register", userValidator.userRegisterValidator, userController.registerUser);
router.post("/login", userValidator.userLoginValidator, userController.loginUser);
router.get("/me", auth.authenticateToken, userController.meUser);

module.exports = router;
