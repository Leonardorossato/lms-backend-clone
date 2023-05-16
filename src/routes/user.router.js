const express = require("express");
const UserController = require("../controllers/user.controller");
const { authMiddleware } = require("../middleware/jwt.middleware");
const validObjectId = require("../middleware/validate.middleware");
const router = express.Router();

router.put("/update/:id", authMiddleware, validObjectId, UserController.update);
router.put("/block/:id", authMiddleware, validObjectId, UserController.update);
router.delete(
  "/delete/:id",
  validObjectId,
  authMiddleware,
  UserController.delete
);

module.exports = router;
