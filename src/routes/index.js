const express = require("express");
const router = express.Router();

const User = require("../models").User;

router.get("/", async function (req, res, next) {
  const users = await User.findAll();

  res.json(users);
});

module.exports = router;
