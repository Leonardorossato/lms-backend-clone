const express = require("express");
const TutorialController = require("../controllers/tutorial.controller");
const validObjectId = require("../middleware/validate.middleware");
const router = express.Router();

router.post("/create", TutorialController.create);
router.get("/all", TutorialController.findAll);
router.get("/:type/:slug", validObjectId, TutorialController.getTutorial);

module.exports = router;
