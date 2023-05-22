const express = require("express");
const UserController = require("../controllers/user.controller");
const { authmiddlewareToken } = require("../middleware/jwt.middleware");
const validObjectId = require("../middleware/validate.middleware");
const router = express.Router();

router.post("/forgot-password", UserController.forgotPassword);

router.put(
  "/update/:id",
  authmiddlewareToken,
  validObjectId,
  UserController.update
);

router.put("/reset-password/:token", UserController.resetPassword);

router.put(
  "/update-password/:id",
  authmiddlewareToken,
  validObjectId,
  UserController.updatePassword
);
router.delete(
  "/delete/:id",
  validObjectId,
  authmiddlewareToken,
  UserController.delete
);

module.exports = router;
