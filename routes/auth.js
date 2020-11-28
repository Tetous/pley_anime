const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");


router.get("/signup", (req, res) => {
  res.render("Signup");
})

router.post("/signup", async (req, res) => {
  try {
    const newUser = await User.register(new User({
      username: req.body.username,
      email: req.body.email
    }), req.body.password)
    req.flash("success", `Signed you up as ${newUser.username}`);
    passport.authenticate("local")(req, res, () => {
      res.redirect("/anime");
    })
  } catch {
    console.log(err);
    res.send(err);
  }
})

router.get("/login", (req, res) => {
  res.render("Login")
})

router.post("/login", passport.authenticate("local", {
  successRedirect: "/Anime",
  failureRedirect: "/Login",
  failureFlash: true,
  successFlash: "Logged in successfuly"
}));


router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success", "Logged you out")
  res.redirect("/Anime")
})

module.exports = router;