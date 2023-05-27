const express = require("express");
const ReviewController = require("../controllers/review.controller");
const {
  authMiddlewareToken,
  isAdminToken,
} = require("../middleware/jwt.middleware");
const router = express.Router();

router.post("/create", authMiddlewareToken, ReviewController.create);
router.get("/all", ReviewController.findAll);
router.get("/:id", authMiddlewareToken, isAdminToken, ReviewController.findOne);
router.put("/:id", authMiddlewareToken, isAdminToken, ReviewController.update);
router.delete(
  "/:id",
  authMiddlewareToken,
  isAdminToken,
  ReviewController.delete
);

module.exports = router;
