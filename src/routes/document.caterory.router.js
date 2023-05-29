const express = require("express");
const router = express.Router();
const { authMiddlewareToken } = require("../middleware/jwt.middleware");
const DocumentCategoryController = require("../controllers/document.category.controller");

router.post("/create", DocumentCategoryController.create);
router.get("/all", DocumentCategoryController.findAll);
router.get("/:id", DocumentCategoryController.findOne);
router.put("/:id", authMiddlewareToken, DocumentCategoryController.update);
router.delete("/:id", authMiddlewareToken, DocumentCategoryController.delete);

module.exports = router;
