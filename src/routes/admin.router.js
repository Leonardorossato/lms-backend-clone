const express = require("express");
const router = express.Router();
const { authenticationTokenAdmin } = require("../middleware/jwt.middleware");
const AdminController = require("../controllers/admin.controller");

router.get("/users/all", authenticationTokenAdmin, AdminController.findAll);

module.exports = router;
