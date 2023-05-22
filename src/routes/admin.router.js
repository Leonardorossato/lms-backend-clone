const express = require("express");
const router = express.Router();
const { isAdminToken } = require("../middleware/jwt.middleware");
const AdminController = require("../controllers/admin.controller");

router.get("/users/all", isAdminToken, AdminController.findAll);

module.exports = router;
