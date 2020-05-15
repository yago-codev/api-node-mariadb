const express = require("express");
const router = express.Router();

const UsersController = require("./controllers/users.controller");

const verifyAccessToken = require("./middlewares/verifyAccessToken.middleware");

router.get("/", verifyAccessToken, UsersController.bindMethod("index"));
router.get("/:id", verifyAccessToken, UsersController.bindMethod("show"));
router.post("/", UsersController.bindMethod("create"));
router.patch("/:id", verifyAccessToken, UsersController.bindMethod("update"));
router.delete("/:id", verifyAccessToken, UsersController.bindMethod("remove"));
router.post("/login", UsersController.bindMethod("login"));

module.exports = router;
