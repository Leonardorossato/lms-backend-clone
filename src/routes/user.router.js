const express = require("express");
const UserController = require("../controllers/user.controller");
const { authenticationTokenUser } = require("../middleware/jwt.middleware");
const validObjectId = require("../middleware/validate.middleware");
const router = express.Router();

router.put(
  "/update/:id",
  authenticationTokenUser,
  validObjectId,
  UserController.update
);
router.put(
  "/block/:id",
  authenticationTokenUser,
  validObjectId,
  UserController.update
);
router.put(
  "/password/:id",
  authenticationTokenUser,
  validObjectId,
  UserController.update
);
router.delete(
  "/delete/:id",
  validObjectId,
  authenticationTokenUser,
  UserController.delete
);

module.exports = router;
