const express = require("express");
const router = express.Router();

const UsersController = require("./controllers/users.controller");

router.get("/", UsersController.index.bind(UsersController));
router.get("/:id", UsersController.show.bind(UsersController));
router.post("/", UsersController.store.bind(UsersController));
router.patch("/", UsersController.update.bind(UsersController));
router.delete("/", UsersController.remove.bind(UsersController));

module.exports = router;
