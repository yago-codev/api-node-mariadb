const express = require("express");
const router = express.Router();

const UsersController = require("./controllers/users.controller");

const verifyAccessToken = require("./middlewares/verifyAccessToken.middleware");
const verifyOwner = require("./middlewares/verifyOwner.middleware");
const onlyAllowsOwner = [verifyAccessToken, verifyOwner];

// Criar
router.post("/", UsersController.bindMethod("create"));
// Logar
router.post("/login", UsersController.bindMethod("login"));
// Listar Todos
router.get("/", verifyAccessToken, UsersController.bindMethod("index"));
// Listar Um Usuário
router.get("/:id", verifyAccessToken, UsersController.bindMethod("show"));
// Editar
router.patch("/:id", onlyAllowsOwner, UsersController.bindMethod("update"));
// Deletar
router.delete("/:id", onlyAllowsOwner, UsersController.bindMethod("remove"));

module.exports = router;
