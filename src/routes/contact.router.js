const express = require("express");
const router = express.Router();
const ContactController = require("../controllers/contact.controller");
const validObjectId = require("../middleware/validate.middleware");
const { authMiddlewareToken } = require("../middleware/jwt.middleware");

router.post("/create", ContactController.create);
router.get("/all", ContactController.findAll);
router.get("/:id", ContactController.findOne);
router.put(
  "/:id",
  authMiddlewareToken,
  ContactController.updateContactStatus
);
router.delete(
  "/:id",
  authMiddlewareToken,
  ContactController.delete
);

module.exports = router;
