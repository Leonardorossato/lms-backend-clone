const express = require("express");
const UserController = require("../controllers/user.controller");
const validObjectId = require("../middleware/validate.middleware");
const { authMiddlewareToken } = require("../middleware/jwt.middleware");
const router = express.Router();

router.post("/forgot-password", UserController.forgotPassword);

router.put(
  "/update/:id",
  authMiddlewareToken,
  validObjectId,
  UserController.update
);

router.put("/reset-password/:token", UserController.resetPassword);

router.put(
  "/update-password/:id",
  authMiddlewareToken,
  validObjectId,
  UserController.updatePassword
);
router.delete(
  "/delete/:id",
  validObjectId,
  authMiddlewareToken,
  UserController.delete
);

module.exports = router;
