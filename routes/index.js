var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

//LANDING PAGE
router.get("/", function(req, res) {
  res.render("landing");
});

//show register form
router.get("/register", function(req, res) {
  res.render("register");
});

//handle register request
router.post("/register", function(req, res) {
  User.register(new User({ username: req.body.username }), req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      req.flash("error", err.message);
      return res.redirect("/register");
    }
    passport.authenticate("local")(req, res, function() {
      req.flash("success", "Welcome to Yelpcamp, " + user.username);
      res.redirect("/campgrounds");
    });
  });
});

//show login form
router.get("/login", function(req, res) {
  res.render("login");
});

//handle login request
router.post("/login", passport.authenticate("local", {
  successRedirect: "/campgrounds",
  failureRedirect: "/login"
}), function(req, res) {});

//logout
router.get("/logout", function(req, res) {
  req.logout();
  req.flash("success", "You have successsfully logged out!");
  res.redirect("/campgrounds");
});



module.exports = router;