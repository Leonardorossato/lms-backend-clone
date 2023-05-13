const express = require("express");
const AuthController = require("../auth/auth.controller");
const router = express.Router();

router.post("/register", AuthController.register);

module.exports = router;
