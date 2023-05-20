const express = require("express");
const TutorialCategoryController = require("../controllers/tutorial.category.controller");
const validObjectId = require("../middleware/validate.middleware");
const router = express.Router();

router.post("/create", TutorialCategoryController.createTutorialCategory);
router.get("/all", TutorialCategoryController.findAll);
router.get("/:id", validObjectId,TutorialCategoryController.findOne);
router.put("/:id", validObjectId, TutorialCategoryController.update);
router.delete("/:id", validObjectId, TutorialCategoryController.delete);

module.exports = router;
