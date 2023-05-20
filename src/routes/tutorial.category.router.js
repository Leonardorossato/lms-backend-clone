const express = require("express");
const TutorialCategoryController = require("../controllers/tutorial.category.controller");
const router = express.Router();

router.get("/all", TutorialCategoryController.findAll);
router.post("/create", TutorialCategoryController.createTutorialCategory);

module.exports = router;
