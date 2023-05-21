const express = require("express");
const TutorialController = require("../controllers/tutorial.controller");
const validObjectId = require("../middleware/validate.middleware");
const router = express.Router();

router.post("/create", TutorialController.create);
router.get("/all", TutorialController.findAll);
router.get("/:type/:slug", TutorialController.getTutorial);
router.put("/:id", validObjectId, TutorialController.update);
router.delete("/:id", validObjectId, TutorialController.delete);

module.exports = router;
