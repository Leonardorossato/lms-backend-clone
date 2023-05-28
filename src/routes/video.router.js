const express = require("express");
const router = express.Router();
const { authMiddlewareToken } = require("../middleware/jwt.middleware");
const VideoController = require("../controllers/video.controller");

router.post("/create", VideoController.create);
router.get("/all", VideoController.findAll);
router.get("/:id", VideoController.findOne);
router.put("/:id", authMiddlewareToken, VideoController.update);
router.delete("/:id", authMiddlewareToken, VideoController.delete);

module.exports = router;
