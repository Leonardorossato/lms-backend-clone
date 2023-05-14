const express = require("express");
const UserController = require("../controllers/user.controller");
const { authMiddleware } = require("../middleware/jwt.middleware");
const router = express.Router();

router.get("/all", UserController.findAll);
router.put("/update/:id", authMiddleware, UserController.update);

module.exports = router;
