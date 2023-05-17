const express = require("express");
const UserController = require("../controllers/user.controller");
const { authenticationTokenUser } = require("../middleware/jwt.middleware");
const validObjectId = require("../middleware/validate.middleware");
const router = express.Router();

router.post("/forgot-password", UserController.forgotPassword);

router.put(
  "/update/:id",
  authenticationTokenUser,
  validObjectId,
  UserController.update
);

router.put("/reset-password/:token", UserController.resetPassword);

router.put(
  "/update-password/:id",
  authenticationTokenUser,
  validObjectId,
  UserController.updatePassword
);
router.delete(
  "/delete/:id",
  validObjectId,
  authenticationTokenUser,
  UserController.delete
);

module.exports = router;
