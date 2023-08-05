const express = require("express");

const weatherController = require("../controllers/weatherController");

const { bearerAuth } = require("../middlewares/bearerAuth");
const { acl } = require("../middlewares/acl");
const router = express.Router();

// router.get("/", bearerAuth, weatherController("all-data"));
router.get("/",weatherController("all-data"));
router.get("/fav/admin", bearerAuth, acl("admin"), weatherController("get-all-favs"));
router.delete("/fav/admin/:id", bearerAuth, acl("admin"), weatherController("delete-a-fav-admin"));
router.get("/fav", bearerAuth, weatherController("get-all-favs"));
router.post("/fav", bearerAuth, weatherController("save-to-fav"));
router.delete("/fav/:id", bearerAuth, weatherController("delete-a-fav"));
router.put("/fav/:id", bearerAuth, weatherController("update-a-fav"));

module.exports = router;
