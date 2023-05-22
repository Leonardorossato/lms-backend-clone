const express = require("express");
const ReviewController = require("../controllers/review.controller");
const { authMiddlewareToken } = require("../middleware/jwt.middleware");
const router = express.Router();

router.post("/create", authMiddlewareToken, ReviewController.create);

module.exports = router;
