const express = require("express");
const UserController = require("../controllers/user.controller");
const router = express.Router();

router.get("/all", UserController.findAll);

module.exports = router;
