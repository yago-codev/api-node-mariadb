const express = require("express");
const router = express.Router();

const UsersController = require("./controllers/users.controller");

router.get("/", UsersController.bindMethod("index"));
router.get("/:id", UsersController.bindMethod("show"));
router.post("/", UsersController.bindMethod("create"));
router.patch("/:id", UsersController.bindMethod("update"));
router.delete("/:id", UsersController.bindMethod("remove"));

module.exports = router;
