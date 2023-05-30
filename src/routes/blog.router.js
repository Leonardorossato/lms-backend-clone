const express = require("express");
const router = express.Router();
const { authMiddlewareToken } = require("../middleware/jwt.middleware");
const BlogController = require("../controllers/blog.controller");

router.post("/create", BlogController.create);
router.get("/all", BlogController.findAll);
router.get("/:id", BlogController.findOne);
router.put("/:id", authMiddlewareToken, BlogController.update);
router.delete("/:id", authMiddlewareToken, BlogController.delete);

module.exports = router;
