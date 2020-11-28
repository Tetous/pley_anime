const express = require("express");
const router = express.Router();
const isLoggedIn = require("../utils/isLoggedIn");

router.get("", (req, res) => {
  res.redirect("Anime");
})

router.get("/account", isLoggedIn, (req, res) => {
  res.render("Account");
})

module.exports = router;