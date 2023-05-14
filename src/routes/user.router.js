const express = require("express");
const UserController = require("../controllers/user.controller");
const { authMiddleware } = require("../middleware/jwt.middleware");
const validObjectId = require("../middleware/validate.middleware");
const router = express.Router();

router.get("/all", UserController.findAll);
router.get("/:id", UserController.findOne);
router.put("/update/:id", authMiddleware, validObjectId, UserController.update);
router.delete(
  "/delete/:id",
  validObjectId,
  authMiddleware,
  UserController.delete
);

module.exports = router;
