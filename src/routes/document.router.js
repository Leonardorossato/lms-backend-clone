const express = require("express");
const router = express.Router();
const { authMiddlewareToken } = require("../middleware/jwt.middleware");
const DocumentController = require("../controllers/document.controller");

router.post("/create", DocumentController.create);
router.get("/all", DocumentController.findAll);
router.get("/:id", DocumentController.findOne);
router.put("/:id", authMiddlewareToken, DocumentController.update);
router.delete("/:id", authMiddlewareToken, DocumentController.delete);

module.exports = router;
