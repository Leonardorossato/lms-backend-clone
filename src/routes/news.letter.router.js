const express = require("express");
const validObjectId = require("../middleware/validate.middleware");
const NewsLettersController = require("../controllers/news.letter.controller");
const router = express.Router();

router.post("/subscribe", NewsLettersController.subscribe);
router.delete(
  "/unsubscribe/:id",
  validObjectId,
  NewsLettersController.unsubscribe
);

module.exports = router;
