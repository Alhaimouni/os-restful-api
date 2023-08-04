const express = require("express");
const axios = require("axios");
const userControlls = require("../controllers/userController");
const { checkUser } = require("../middlewares/checkUsers");
const { basicAuth } = require("../middlewares/basicAuth");
const router = express.Router();

router.post("/signup", checkUser, userControlls("sign-up"));
router.post("/login", basicAuth, userControlls("login"));

module.exports = router;
